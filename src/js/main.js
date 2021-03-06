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
        const error = document.querySelector(`.error`)
        e.preventDefault()
        if(invalid != null || error != null){
        
          self.fields.forEach(field => {
            const input = document.querySelector(`#${field}`)
            self.validateFields(input)
          })
        }else{
          self.successForm(self.form)
        }
          
      })
    }
    
    validateOnEntry() {
      let self = this
      this.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        input.addEventListener('input', event => {
          self.validateFields(input)
        })
        input.addEventListener('click', event => {
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
          this.setStatus(field, "Телефон в формате +375112223344", "error")
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

       // check for a valid select
     if(field.firstElementChild != null && field.firstElementChild.tagName ===`SELECT`){
      const customSelectItems = document.querySelectorAll(`#${field.id} div`)
      customSelectItems.forEach((item)=>{
       item.addEventListener(`click`,()=>{
        field.classList.remove(`error`)
        field.classList.remove(`invalid`)
       })
      })
     if(field.firstElementChild.value == 0){
      field.classList.add(`error`)
     } else {
      field.classList.remove(`error`)
      field.classList.remove(`invalid`)
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

    successForm(formId){
      let successBlock = document.createElement(`div`)
      let imgSuccess = document.createElement(`img`)
      let textSuccess = document.createElement(`p`)
      
      textSuccess.innerHTML = `<div>Отправлено!</div>
      С вами свяжутся в ближайшее время`
  
      imgSuccess.setAttribute(`src`,'./img/success-icon-form.svg')
      successBlock.classList.add(`success-form`)
  
      successBlock.append(imgSuccess)
      successBlock.append(textSuccess)
      let form = formId
  
      form.children[1].style.position = `relative`
      form.children[1].append(successBlock)
  
    }
  }
  

/* Initialize validation for all forms in website*/ 

  const form = document.querySelector('#form')
  if(form != null){
    const fields = ["telephone","name","message","checkbox"]
    const validator = new FormValidator(form, fields)
    validator.initialize()
  }

  const testDriveForm = document.querySelector(`#form-test-drive`)
  if(testDriveForm != null){
    const fields = ["name-test-drive","telephone-test-drive","checkbox-test-drive", "select-date", "select-time"]
    const validator = new FormValidator(testDriveForm, fields)
    validator.initialize()
  }

  const callbackForm = document.querySelector(`#form-callback`)
  if(callbackForm != null){
    const fields = ["name-callback","telephone-callback","checkbox-callback"]
    const validator = new FormValidator(callbackForm, fields)
    validator.initialize()
  }

  const rentForm = document.querySelector(`#form-rent`)
  if(rentForm != null){
    const fields = ["name-rent","telephone-rent","select-rent-date", "select-rent-time", "checkbox-rent"]
    const validator = new FormValidator(rentForm, fields)
    validator.initialize()
  }

  const questionForm = document.querySelector(`#form-question`)
  if(questionForm != null){
    const fields = ["name-question","telephone-question","message-question", "checkbox-question"]
    const validator = new FormValidator(questionForm, fields)
    validator.initialize()
  }


 /************Accordion in question block *****************/
 const questionBloks = document.querySelectorAll(`.questions-block`)
 function removeOpenClass (){
  questionBloks.forEach((el) => {
    el.classList.remove(`open`)
})
 }
 if(questionBloks != null){
   questionBloks.forEach((block) =>{
     
    block.addEventListener(`click`, () =>{
      removeOpenClass ()
      block.classList.add(`open`)
    })
   })
 }


/**************Slayder in about car section *************/
const aboutCar = document.querySelector(`.aboutCar`)
if(aboutCar != null){
  const caruselItem = document.querySelectorAll(`.carusel-item`)
  const mainImg = document.querySelector(`.main-img`)
  const prev = document.querySelector(`.prev`)
  const next = document.querySelector(`.next`)
  const length = caruselItem.length
  let itemCount = 3

  next.addEventListener(`click`, () =>{
    if(itemCount < length){
      itemCount += 1
      caruselItem.forEach((item,index)=>{
        item.style.display = `none`
        if(index <= itemCount && index >= itemCount-3){
          item.style.display = `block`
        }
      })
    }
  })

  prev.addEventListener(`click`, () =>{
    if(itemCount > 3){
      itemCount -= 1
      caruselItem.forEach((item,index)=>{
        item.style.display = `none`
        if(index <= itemCount && index >= itemCount-3){
          item.style.display = `block`
        }
      })
    }
  })


  caruselItem.forEach((item,index)=>{
    item.style.display = `none`
    if(index <= itemCount && index >= itemCount-3){
      item.style.display = `block`
    }
item.addEventListener(`click`,()=>{
  mainImg.classList.toggle(`animate`)
  setTimeout(()=>{
    mainImg.setAttribute(`src`, item.getAttribute(`src`))
    mainImg.classList.toggle(`animate`)
  },400)
 
})
  })

}

/**************Custom Select**************************/
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect); 