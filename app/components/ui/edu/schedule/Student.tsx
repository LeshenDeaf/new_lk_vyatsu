import React, { FC } from 'react'
import { IScheduleStudent } from '../../../../models/schedule';

interface IProps {
  student: IScheduleStudent;
}

const Student: FC<IProps> = ({ student }) => {
  return (
    <div className='w-1/3 mb-2'>{student.name}</div>
  )
}

export default Student;
