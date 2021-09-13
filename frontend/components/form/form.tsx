import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onSubmit: Function
}

export const Form: FC<Props> = ({ children, onSubmit }) => (
  <form onSubmit={(event) => onSubmit(event)}>{children}</form>
)

export default Form
