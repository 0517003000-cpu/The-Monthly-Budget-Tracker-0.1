function getNumber(value){
if(!value) return 0
return parseInt(value.toString().replace(/\./g,"")) || 0
}

function formatNumber(num){
return num.toLocaleString("id-ID")
}

function calculate(){

let essentialInputs=document.querySelectorAll(".essentialInput")
let nonInputs=document.querySelectorAll(".nonInput")
let saveInputs=document.querySelectorAll(".saveInput")

let essentialTotal=0
let nonTotal=0
let saveTotal=0


essentialInputs.forEach(input=>{
essentialTotal+=getNumber(input.value)
})

nonInputs.forEach(input=>{
nonTotal+=getNumber(input.value)
})

saveInputs.forEach(input=>{
saveTotal+=getNumber(input.value)
})


document.getElementById("essentialTotal").innerText=formatNumber(essentialTotal)
document.getElementById("nonTotal").innerText=formatNumber(nonTotal)
document.getElementById("saveTotal").innerText=formatNumber(saveTotal)


let essentialBudget=getNumber(document.getElementById("essentialBudget").innerText)
let nonBudget=getNumber(document.getElementById("nonBudget").innerText)
let saveBudget=getNumber(document.getElementById("saveBudget").innerText)


updateStatus("essential",essentialTotal,essentialBudget)
updateStatus("non",nonTotal,nonBudget)
updateStatus("save",saveTotal,saveBudget)

saveData()
}


function updateStatus(type,total,budget){

let status=document.getElementById(type+"Status")

if(total>budget){
status.innerText="Over Budget"
status.style.color="red"
}else{
status.innerText="Under Budget"
status.style.color="green"
}

generateAdvice()

}



function generateAdvice(){

let advice=document.getElementById("adviceMessage")

let essentialTotal=getNumber(document.getElementById("essentialTotal").innerText)
let nonTotal=getNumber(document.getElementById("nonTotal").innerText)
let saveTotal=getNumber(document.getElementById("saveTotal").innerText)

let essentialBudget=getNumber(document.getElementById("essentialBudget").innerText)
let nonBudget=getNumber(document.getElementById("nonBudget").innerText)
let saveBudget=getNumber(document.getElementById("saveBudget").innerText)

let overEssential = essentialTotal>essentialBudget
let overNon = nonTotal>nonBudget
let overSave = saveTotal>saveBudget



if(!overEssential && !overNon && !overSave){

advice.innerHTML=
"✅ Your spending is within budget.<br><br>"+
"Good habits to continue:<br>"+
"• Keep tracking expenses daily<br>"+
"• Continue following the 50/30/20 budgeting rule<br>"+
"• Build your emergency fund gradually"

return
}



if(overEssential && !overNon && !overSave){

advice.innerHTML=
"⚠️ You are over budget in <b>Essential Expenses</b>.<br><br>"+
"Possible solutions:<br>"+
"• Review fixed costs like rent, utilities, and bills<br>"+
"• Look for cheaper alternatives for services<br>"+
"• Reduce unnecessary essential upgrades<br>"+
"• Adjust your essential budget if income changed"

return
}



if(!overEssential && overNon && !overSave){

advice.innerHTML=
"⚠️ You are over budget in <b>Non-Essential Expenses</b>.<br><br>"+
"Recommendations:<br>"+
"• Reduce shopping, entertainment, or dining out<br>"+
"• Wait 24-48 hours before buying non-essential items<br>"+
"• Set a weekly spending limit"

return
}



if(!overEssential && !overNon && overSave){

advice.innerHTML=
"⚠️ Your <b>Savings category</b> exceeds the planned allocation.<br><br>"+
"Reminder:<br>"+
"• Make sure essential needs are covered first<br>"+
"• Balance needs, wants, and savings"

return
}



if(overEssential && overNon && !overSave){

advice.innerHTML=
"⚠️ You are over budget in <b>Essential and Non-Essential Expenses</b>.<br><br>"+
"Recommended actions:<br>"+
"• Reduce non-essential spending immediately<br>"+
"• Delay unnecessary purchases<br>"+
"• Review your largest expenses"

return
}



if(overEssential && overNon && overSave){

advice.innerHTML=
"🚨 You are over budget in <b>all categories</b>.<br><br>"+
"Important actions:<br>"+
"• Review your biggest expenses immediately<br>"+
"• Pause non-essential spending<br>"+
"• Prioritize needs first (food, housing, utilities)<br>"+
"• Avoid using loans to cover overspending<br>"+
"• Create stricter monthly spending limits"

}

}



function saveData(){

let data={}

document.querySelectorAll("input").forEach((input,i)=>{
data["input"+i]=input.value
})

localStorage.setItem("budgetData",JSON.stringify(data))

}



function loadData(){

let data=localStorage.getItem("budgetData")

if(!data) return

data=JSON.parse(data)

document.querySelectorAll("input").forEach((input,i)=>{
if(data["input"+i]){
input.value=data["input"+i]
}
})

calculate()

}



document.querySelectorAll("input").forEach(input=>{
input.addEventListener("input",calculate)
})


window.onload=loadData
