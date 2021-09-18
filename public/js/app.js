

console.log('Client side javascript file is loaded')





const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    console.log("Listening......")
    messageTwo.textContent=''
    messageOne.textContent=''
    const location=search.value;
    const url='/weather?address=' +location
    
    fetch(url).then((response) =>
    {
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageTwo.textContent=JSON.stringify(data.error);
            }
            else
            {
                messageOne.textContent=JSON.stringify(data.location); 
                messageTwo.textContent=JSON.stringify(data.description);
            
            }
          
        })
    })
})