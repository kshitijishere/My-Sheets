const btn=document.querySelector('#addsheet');
const firstsheet=document.querySelector('.sheetno');
firstsheet.addEventListener('click',handler); 
btn.addEventListener('click',()=>{
    let totalsheets=document.querySelectorAll('.sheetno');
    let index=totalsheets.length;
    index=Number(index);
    console.log(index);
    let sheet=document.createElement('div');
    sheet.append(`sheet${index+1}`)
    sheet.classList.add('sheetno');
    sheet.classList.add('active');
    sheet.setAttribute('idx',index+1);
    const sheetspace=document.querySelector('.sheetspace');
    sheetspace.append(sheet);
    for(let shee of totalsheets)
    {
        shee.classList.remove('active');
    }
    sheet.addEventListener('click',handler);
    
})
function handler(){
    let total=document.querySelectorAll('.sheetno');
    for(let sheet of total)
    {
        sheet.classList.remove('active');
    }
    this.classList.add('active');
}



// script for grid

const firstcol=document.querySelector('.firstcol');
for(let i=1;i<=100;i++)
{
    let div=document.createElement('div');
    div.append(i);
    div.classList.add('firstcoldiv');
    firstcol.append(div);
}



