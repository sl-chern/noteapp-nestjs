import { Model, Table, Column, DataType } from 'sequelize-typescript'

interface NoteCreationAttrs {
  name: string,
  category: string,
  content: string
}

@Table({tableName: 'notes'})
export class Note extends Model<Note, NoteCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataType.STRING, allowNull: false})
  name: string

  @Column({type: DataType.STRING, allowNull: false})
  category: string

  @Column({type: DataType.TEXT, allowNull: false})
  content: string

  @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
  archived: boolean
}