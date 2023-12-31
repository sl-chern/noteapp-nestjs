import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { NotesModule } from './notes/notes.module'
import { ConfigModule } from "@nestjs/config"
import { Note } from "./notes/notes.model"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Note],
      autoLoadModels: true
    }),
    NotesModule
  ]
})
export class AppModule {}