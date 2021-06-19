/**************************Form Validation****************************/

class FormValidator {
    constructor(form, fields) {
      this.form = form
      this.fields = fields
    }  
    
    initialize() {
      this.validateOnEntry()
      this.validateOnSubmit()
    }
    
    validateOnSubmit() {
      let self = this
      
      this.form.addEventListener('submit', e => {
        const invalid = document.querySelector(`.invalid`)
        if(invalid != null){
          e.preventDefault()
        }
         
  
          self.fields.forEach(field => {
          const input = document.querySelector(`#${field}`)
          self.validateFields(input)
        })
      })
    }
    
    validateOnEntry() {
      let self = this
      this.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        
        input.addEventListener('input', event => {
          self.validateFields(input)
        })
      })
  
      
    }
    
    validateFields(field) {
    
      // Check presence of values
      if (field.type === "text" || field.type ==="textarea"){
        if (field.value.trim() === "") {
            this.setStatus(field, `Поле ${field.getAttribute(`data-name`)} не заполнено`, "error")
          } else {
                this.setStatus(field, null, "success")
          }
      }
     
      
      // check for a valid tel 
      if (field.type === "tel") {
        const re = /^\+?3?7?(5\d{9})$/
        if (re.test(field.value)) {
          this.setStatus(field, null, "success")
        } else {
          this.setStatus(field, "Введите телефона в формате +375112223344", "error")
        }
      }
  
       // check for a valid checkbox 
     if(field.type === "checkbox") {
        const customCheckbox = document.querySelector(`.custom__checkbox`)
        if(field.checked){
          customCheckbox.classList.remove(`error`)
          customCheckbox.classList.remove(`invalid`)
        } else {
          customCheckbox.classList.add(`error`)
          customCheckbox.classList.add(`invalid`)
        }
      }
     
    }
  
    setStatus(field, message, status) {
      
      const successIcon = field.parentElement.querySelector('.icon-success')
      const errorIcon = field.parentElement.querySelector('.icon-error')
     
  
  if(successIcon && errorIcon != null){
  
      if (status === "success") {
        if (errorIcon) { errorIcon.classList.add('hidden') }

        successIcon.classList.remove('hidden')
        field.classList.remove('input-error')
        field.classList.remove('invalid')
      } 
      
      if (status === "error") {
        if (successIcon) { successIcon.classList.add('hidden') }

        field.placeholder = message
        errorIcon.classList.remove('hidden')
        field.classList.add('input-error')
      }    
    
    }
    
    }
  }
  
  const form = document.querySelector('#form')
  const fields = ["telephone","name","message","checkbox"]
  
  const validator = new FormValidator(form, fields)
  validator.initialize()
