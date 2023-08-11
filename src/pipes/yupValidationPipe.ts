import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus, } from '@nestjs/common';
import { plainToClass } from 'class-transformer'
import { Schema } from 'yup'

@Injectable()
export class YupValidationPipe implements PipeTransform<any> {
  constructor(private schema: Schema) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value)

    if(typeof obj === 'object') {
      const bodyKeys = Object.keys(this.schema.getDefault() || {})
      const unknownFields = Object.keys(obj).filter(field => !bodyKeys.includes(field))
      if(unknownFields.length > 0)
        throw new HttpException("body has unknown fields", HttpStatus.BAD_REQUEST)
      
      await this.schema.validate(value, {strict: true}).catch(err => { throw new HttpException(err.errors.join('; '), HttpStatus.BAD_REQUEST) })
    }

    return value
  }
}
