import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Note } from './notes.model'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { Sequelize } from 'sequelize'
import categories from 'src/data/categories'
import { notes } from 'src/data/notes'

@Injectable()
export class NotesService implements OnModuleInit {
  constructor(@InjectModel(Note) private noteRepository: typeof Note) {}

  async onModuleInit() {
    const notesCount = await this.noteRepository.count()
    if(notesCount === 0)
      await this.noteRepository.bulkCreate(notes)
  }

  async createNote(dto: CreateNoteDto): Promise<Note> {
    const note = await this.noteRepository.create(dto)
    return note
  }

  async getAllNotes(): Promise<Array<Note>> {
    const notes = await this.noteRepository.findAll()
    return notes
  }

  async getNoteById(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: {
        id
      }
    })
    return note
  }

  async updateNote(id: number, dto: UpdateNoteDto): Promise<void> {
    await this.noteRepository.update(dto, {
      where: {
        id
      }
    })
  }

  async deleteNote(id: number): Promise<void> {
    await this.noteRepository.destroy({
      where: {
        id
      }
    })
  }

  async getNotesCountByArchivated(archived: boolean): Promise<Array<Note>> {
    const notesCount = await this.noteRepository.findAll({
      attributes: ['category', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
      where: {
        archived
      },
      group: ['category']
    })
    return notesCount
  }

  async getStats(): Promise<any> {
    const archivedNotes = await this.getNotesCountByArchivated(true)
    const notArchivedNotes = await this.getNotesCountByArchivated(false)

    const result = {}

    categories.forEach((category: string): void => {
      result[category] = {
        archived: +archivedNotes.find(archivedCategory => archivedCategory.category === category)?.get('count') || 0,
        notArchived: +notArchivedNotes.find(notArchivedCategory => notArchivedCategory.category === category)?.get('count') || 0
      }
    })

    return result
  }
}
