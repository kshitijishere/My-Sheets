let sheetdb=[];
for(let i=1;i<=100;i++)
{
    let row=[];
    for(j=1;j<=26;j++)
    {
        let ob={
            bold:"normal",
            italic:"normal",
            underline:"none",
            halign:"center",
            fontfamily:"sans-sherif",
            textsize:"12",
            color:"black",
        }
        row.push(ob);
    }
    sheetdb.push(row);
   
}















// ********************database above**********************
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
            
            display.value=`${String.fromCharCode(64+j)}${i}`;
            let ob=sheetdb[i][j];
            const bold=document.querySelector('#span1');
            if(ob.bold=="normal")
                bold.classList.remove('iconactive');
            else
                bold.classList.add('iconactive');
            const italic=document.querySelector('#span3');
            if(ob.italic=="normal")
                italic.classList.remove('iconactive');
            else
                italic.classList.add('iconactive');
            const uline=document.querySelector('#span2');
            if(ob.underline=="none")
                uline.classList.remove('iconactive');
            else
                uline.classList.add('iconactive');
            const leftalign=document.querySelector('#left');
            const rightalign=document.querySelector('#right');
            const centeralign=document.querySelector('#center')
            if(ob.halign=="left")
            {
                leftalign.classList.add('iconactive');
                rightalign.classList.remove('iconactive');
                centeralign.classList.remove('iconactive');
            }
            else if(ob.halign=="right")
            {
                rightalign.classList.add('iconactive');
                leftalign.classList.remove('iconactive');
                centeralign.classList.remove('iconactive');
            }  
            else
            {
                centeralign.classList.add('iconactive');
                rightalign.classList.remove('iconactive');
                leftalign.classList.remove('iconactive');
            }
            // alert(`${ob.textsize}`);
            let size=document.querySelector('#fontsize');
            size.value=`${ob.textsize}`;
                

            
        })
        
        row.append(div);
    }
    grid.append(row);
}



// script for menu
function getloc(){
    let selected=document.querySelector('#selectedcell');
        
    let colno=selected.value.charCodeAt(0);
    colno=colno-64;
    colno=colno.toString();
    let rowno="";
    for(let i=1;i<selected.value.length;i++)
    {
        rowno=rowno+selected.value[i];
    }

    rowno=rowno.toString();
    
    return{colno,rowno};
}
let bold=document.querySelector('#span1');
bold.addEventListener('click',()=>{
    bold.classList.add('iconactive');
    let colno,rowno;
    let ob=getloc();
    colno=ob.colno;
    rowno=ob.rowno;
    let dbob=sheetdb[rowno][colno];
    let celldiv=document.querySelector(`div[col="${colno}"][row="${rowno}"]`);
    if(dbob.bold=="bold")
    {
        dbob.bold="normal";
        celldiv.style.fontWeight="normal";
        bold.classList.remove('iconactive');
    }
        
    else
    {
        dbob.bold="bold";
        celldiv.style.fontWeight="bold";
    }
        
    
    
})

let italic=document.querySelector('#span3');
italic.addEventListener('click',()=>{
    italic.classList.add('iconactive');
    let ob=getloc();
    let colno=ob.colno;
    let rowno=ob.rowno;
    let dbob=sheetdb[rowno][colno];
    let celldiv=document.querySelector(`div[col="${colno}"][row="${rowno}"]`);
    
    if(dbob.italic=="italic")
    {
        dbob.italic="normal";
        italic.classList.remove('iconactive');
        celldiv.style.fontStyle="normal";

    }
    else
    {
        dbob.italic="italic";
        celldiv.style.fontStyle="italic";
    }
        
    
})
let underline=document.querySelector('#span2');
underline.addEventListener('click',()=>{
    let ob=getloc();
    let colno=ob.colno;
    let rowno=ob.rowno;
    let dbob=sheetdb[rowno][colno];
    let celldiv=document.querySelector(`div[col="${colno}"][row="${rowno}"]`);
    if(dbob.underline=="underline")
    {
        dbob.underline="none";
        underline.classList.remove('iconactive');
        celldiv.style.textDecoration="none";
    }
    else{
        dbob.underline="underline";
        underline.classList.add('iconactive');
        celldiv.style.textDecoration="underline";
    }
})
let alignment=document.querySelectorAll('#align>*');
for(let i=0;i<alignment.length;i++)
{
    alignment[i].addEventListener('click',()=>{
    let align=alignment[i].getAttribute('id');
    alignment[i].classList.add('iconactive');
    if(i==0)
    {
        alignment[1].classList.remove('iconactive');
        alignment[2].classList.remove('iconactive');
    }
    if(i==1)
    {
        alignment[0].classList.remove('iconactive');
        alignment[2].classList.remove('iconactive');
    }
    if(i==2)
    {
        alignment[0].classList.remove('iconactive');
        alignment[1].classList.remove('iconactive');
    }
    let ob=getloc();
    let colno=ob.colno;
    let rowno=ob.rowno;
    let dbob=sheetdb[rowno][colno];
    dbob.halign=`${align}`;
    let celldiv=document.querySelector(`div[col="${colno}"][row="${rowno}"]`);
    celldiv.style.textAlign=`${align}`;
    })
}
let textsize=document.querySelector('#fontsize');
textsize.addEventListener('change',()=>{
    let value=textsize.value;
    let ob=getloc();
    let colno=ob.colno;
    let rowno=ob.rowno;
    let dbob=sheetdb[rowno][colno];
    dbob.textsize=`${value}`;
    let celldiv=document.querySelector(`div[col="${colno}"][row="${rowno}"]`);
    celldiv.style.fontSize=`${value}px`;
})


