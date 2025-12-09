const birthday = new Date(1181416380000);
const now = new Date();
var calc = (now-birthday)/31540000000;
calc = Math.floor(calc);

const element = document.getElementById("age");

element.innerHTML=calc+" year";
element.title = birthday.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
//the title is absolutely pointless lmao

