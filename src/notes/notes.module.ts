import { Module } from '@nestjs/common'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Note } from './notes.model'

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [
    SequelizeModule.forFeature([Note]),
  ]
})
export class NotesModule {}
