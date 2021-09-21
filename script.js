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
            bgcolor:"#eeeef8",
            formula:"",
            value:"",
            children:[],
        }
        row.push(ob);
    }
    sheetdb.push(row);   
}
  

// ********************database above**********************
//**************newopen save */

const downloadfile=document.querySelector('.download');
downloadfile.addEventListener('click',()=>{
    const data = JSON.stringify(sheetdb);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

// Create a link and trigger the download
    const link = document.createElement('a');
    link.download = 'filenamedata';
    link.href = `${url}`;
    document.body.appendChild(link);
    link.click();
    // Remove the element
    document.body.removeChild(link);
    // Free the URL created above
    window.URL.revokeObjectURL(url);
})
const upload=document.querySelector('.open');
upload.addEventListener('click',()=>{
    
})









// ********************************************sheets*****************




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
    row.classList.add('rows');
    for(let j=1;j<=26;j++)
    {
        const div=document.createElement('div');
        div.classList.add('cells');
        div.setAttribute('col',j);
        div.setAttribute('row',i);
        div.setAttribute('contenteditable',"true");
        // div.innerText=`${String.fromCharCode(64+j)}${i}`;
        div.addEventListener('blur',()=>{
            let ob=sheetdb[i][j];
            if(ob.value!=div.innerText)
            {
                if(ob.children)
                {
                    ob.value=div.innerText;
                    reevaluate(ob);
                } 
                if(ob.formula.length>=1)
                {
                    breakparentconnection(ob,i,j);
                    ob.formula="";
                } 
                 
            }
            else
            {
                ob.value=div.innerText;
            }
            
            
        })
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
            let size=document.querySelector('#fontsize');
            size.value=`${ob.textsize}`;
            const formulabarvalue=document.querySelector('#formulainput');
            formulabarvalue.value=sheetdb[i][j].formula;

                

            
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
const colorpicker=document.querySelector('.colorpicker');
const inputcolor=document.querySelector('#inputtextcolor');
inputcolor.addEventListener('change',()=>{
    let ob=getloc();
    let colno=ob.colno;
    let rowno=ob.rowno;
    let dbob=sheetdb[rowno][colno];
    dbob.color=`${inputcolor.value}`;
    let celldiv=document.querySelector(`div[col="${colno}"][row="${rowno}"]`);
    celldiv.style.color=`${inputcolor.value}`;
})
colorpicker.addEventListener('click',()=>{
    inputcolor.click();  
})
const cellcolor=document.querySelector('.cellcolor');
const inputcellcolor=document.querySelector('#inputbgcolor');
inputcellcolor.addEventListener('change',()=>{
    let ob=getloc();
    let colno=ob.colno;
    let rowno=ob.rowno;
    let dbob=sheetdb[rowno][colno];
    dbob.bgcolor=`${inputcellcolor.value}`;
    let celldiv=document.querySelector(`div[col="${colno}"][row="${rowno}"]`);
    celldiv.style.backgroundColor=`${inputcellcolor.value}`;
})
cellcolor.addEventListener('click',()=>{
    inputcellcolor.click();
})



// **********************formula bar hehe************************888

const formula=document.querySelector('#formulainput');
formula.addEventListener('keydown',(e)=>{
    if(e.key=="Enter"&&formula.value)
    {
        let colno,rowno;
        let ob=getloc();
        colno=ob.colno;
        rowno=ob.rowno;
        let value = formula.value.split(" ");
        if(sheetdb[rowno][colno].formula)
        {
            breakparentconnection(sheetdb[rowno][colno],rowno,colno);
        }
        let cellonformulavalue=evaluateexpression(value,true);
    // let cell1string=value[1];
    // let cell2string=value[3];
    // let operator=value[2];
    // let col1=cell1string[0].charCodeAt(0);
    // col1=col1-64;
    // let row1="";
    // for(let i=1;i<cell1string.length;i++)
    // {
    //     row1=row1+cell1string[i];
    // }
    // let col2=cell2string[0].charCodeAt(0);
    // col2=col2-64;
    // let row2="";
    // for(let i=1;i<cell2string.length;i++)
    // {
    //     row2=row2+cell2string[i];
    // }
    // const cell1value=sheetdb[row1][col1].value;
    // const cell2value=sheetdb[row2][col2].value;
// ***********for  getting value of selected cell on which operation is made 
    const cellonformula=document.querySelector(`div[row="${rowno}"][col="${colno}"]`);
    // if(operator=="+")
    // {
    //     cellonformulavalue=Number(cell1value)+Number(cell2value);
    // }
        
    // if(operator=="-")
    //     cellonformulavalue=Number(cell1value)-Number(cell2value);
    // if(operator=="*")
    //     cellonformulavalue=Number(cell1value)*Number(cell2value);
    //     if(operator=="/")
    //     cellonformulavalue=Number(cell1value)/Number(cell2value);
    cellonformula.innerText=cellonformulavalue;
    sheetdb[rowno][colno].value=cellonformulavalue;
    sheetdb[rowno][colno].formula=formula.value;
    }
})
function evaluateexpression(value,check)
{
    for(let i=0;i<value.length;i++)
    {
        if(value[i].charCodeAt(0)>=65&&value[i].charCodeAt(0)<=90)
        {
            let col=value[i].charCodeAt(0)-64;
            let row=value[i].substring(1);
            const cellvalue=sheetdb[row][col].value;
            const addr=document.querySelector('#selectedcell');
            if(check)
                sheetdb[row][col].children.push(addr.value);     
            value[i]=cellvalue;    
        }
    }
    value=value.join(" ");
    return eval(value);
}
function reevaluate(ob)
{
    const children=ob.children;
    for(let k=0;k<children.length;k++)
    {
        const col=children[k].charCodeAt(0)-64;
        const row=children[k].substring(1);
        let addressformula=sheetdb[row][col].formula;
        addressformula=addressformula.split(" ");
        const expression=evaluateexpression(addressformula,false);
        sheetdb[row][col].value=expression;
        const div2=document.querySelector(`div[col="${col}"][row="${row}"]`);
        
        div2.innerText=expression;
        if(sheetdb[row][col].children.length)
        {
            reevaluate(sheetdb[row][col]);
        }
    }

}
function breakparentconnection(ob,row,col)
{
    let formulavalue=ob.formula.split(" ");
    for(let i=0;i<formulavalue.length;i++)
    {
        if(formulavalue[i].charCodeAt(0)>=65&&formulavalue[i].charCodeAt(0)<=90)
        {
            let parentcell=formulavalue[i];
            console.log(parentcell);
            let colparent=parentcell.charCodeAt(0)-64;
            let rowparent=parentcell.substring(1);
            console.log(colparent);
            console.log(rowparent);
            let col2=String.fromCharCode(`${col}+64`); 
            console.log(col2);
            let index=sheetdb[rowparent][colparent].children.indexOf(`${col}${row}`);
            sheetdb[rowparent][colparent].children.splice(index,1);
        }
    }
}

