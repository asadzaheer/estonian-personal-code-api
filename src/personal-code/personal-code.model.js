import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class PersonalCode extends Model {
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    unique: true,
    validate: {
      is: /^[0-9]{11}$/i, // Validate that the personal code is 11 digits
    },
  })
  code;
}
