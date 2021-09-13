import { useState } from 'react'

export const useForm = <S>(initialValues: S, callback: (values: S) => void) => {
  const [formValues, setFormValues] = useState<S>(initialValues)

  const formOnSubmit = (event: Event) => {
    if (event) event.preventDefault()
    callback(formValues)
  }

  const formOnChange = (event: any) => {
    event.persist()
    setFormValues((values: any) => ({
      ...values,
      ...setFormValue(event)
    }))
  }

  const formOnChangeValue = (name: string, value: any) => {
    setFormValues((values: any) => ({
      ...values,
      [name]: value
    }))
  }

  const setFormValue = (event: any) => {
    const { name, type, value, checked } = event.target

    if (type === 'checkbox') {
      if (name.includes('[')) {
        const nameParts = name.split(/[[\]]{1,2}/) // Break ex. "organisation[abc123]" into key "organisation" and value "abc123"
        const nameKey: string = nameParts[0] // the "name" of the input
        const nameValue: string = nameParts[1] // the "id" of the resource

        let formValueArray = (formValues as Record<string, any>)[nameKey]
          ? [...(formValues as Record<string, any>)[nameKey]]
          : []

        if (checked) {
          formValueArray.push(nameValue)
        } else {
          formValueArray = formValueArray.filter((item) => item !== nameValue)
        }

        return {
          [nameKey]: formValueArray
        }
      }

      return {
        [name]: checked
      }
    }

    return {
      [name]: value
    }
  }

  return {
    formOnSubmit,
    formOnChange,
    formOnChangeValue,
    formValues
  }
}

export default useForm
