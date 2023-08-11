import { Body, Controller, Post, Get, Param, Patch, Delete, UsePipes } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { NotesService } from './notes.service'
import { UpdateNoteDto } from './dto/update-note.dto'
import { createNoteSchema } from './schemas/create-note.schema'
import { updateNoteSchema } from './schemas/update-note.schema'
import { YupValidationPipe } from 'src/pipes/yupValidationPipe'

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @UsePipes(new YupValidationPipe(createNoteSchema))
  @Post()
  createNote(@Body() noteDto: CreateNoteDto) { 
    return this.notesService.createNote(noteDto)
  }

  @Get()
  getAllNotes() {
    return this.notesService.getAllNotes()
  }

  @Get('/stats')
  getStats() {
    return this.notesService.getStats()
  }

  @Get('/:id')
  getNote(@Param('id') id: number) {
    return this.notesService.getNoteById(id)
  }

  @UsePipes(new YupValidationPipe(updateNoteSchema))
  @Patch('/:id')
  updateNote(@Param('id') id: number, @Body() noteDto: UpdateNoteDto) {
    return this.notesService.updateNote(id, noteDto)
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: number) {
    return this.notesService.deleteNote(id)
  }
}
