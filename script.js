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
const toprow=document.querySelector('.firstrow');
for(var i=1;i<=26;i++)
{
    const div=document.createElement('div');
    div.innerText=String.fromCharCode(64+i);
    div.classList.add('firstrowdiv');
    toprow.append(div);
}
const grid=document.querySelector('.grid');
for(let i=1;i<=100;i++)
{
    const row=document.createElement('div');
    row.innerText;
    row.classList.add('rows');
    for(let j=1;j<=26;j++)
    {
        const div=document.createElement('div');
        div.classList.add('cells');
        div.setAttribute('col',j);
        div.setAttribute('row',i);
        div.setAttribute('contenteditable',"true");
        // div.innerText=`${String.fromCharCode(64+j)}${i}`;
        div.addEventListener('click',()=>{
            const display=document.querySelector('#selectedcell');
            
            display.value=`${String.fromCharCode(64+j)}${i}`
        })
        
        row.append(div);
    }
    grid.append(row);
}



// script for menu

let bold=document.querySelector('#span1');
bold.addEventListener('click',()=>{
    bold.classList.add('iconactive');
        let ad=document.querySelector('#selectedcell');
        
        let colno=ad.value.charCodeAt(0);
        colno=colno-64;
        colno=colno.toString();
        let rowno="";
        for(let i=1;i<ad.value.length;i++)
        {
            rowno=rowno+ad.value[i];
        }

        rowno=rowno.toString();
        
        let celldiv=document.querySelector(`div[col="${colno}"][row="${rowno}"]`);
    
    celldiv.style.fontWeight="bold";
})

