import categories from 'src/data/categories'
import * as yup from 'yup'

export const createNoteSchema = yup.object().shape({
  name: yup.string().min(1).required(),
  content: yup.string().min(1).required(),
  category: yup.string().oneOf(categories).required()
})