import categories from 'src/data/categories'
import * as yup from 'yup'

export const updateNoteSchema = yup.object().shape({
  name: yup.string().min(1),
  content: yup.string().min(1),
  category: yup.string().oneOf(categories),
  archived: yup.boolean()
})