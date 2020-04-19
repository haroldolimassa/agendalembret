(function(){
    const $ = q => document.querySelector(q);

    function convertPeriod(mil) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    };

    function renderGarage () {
        const garage = getGarage();
        $("#garage").innerHTML = "";
garage.forEach(c => addToMensagem(c))

};

function addToMensagem (impressao) {
	const row = document.createElement("tr");

	row.innerHTML = `
<td>${impressao.inpMensagem}</td>
<td data-time="${impressao.time}">
${new Date(impressao.time).toLocaleString('pt-BR', {
	hour:'numeric', minute: 'numeric'
})}</td>
<td>
<button class="delete">x</button>
</td>
					`;
					$("#garage").appendChild(row);
};

function checkOut(info){
let period = new Date() - new Date(info[2].dataset.time);
period = convertPeriod(period);

const licence = info[1].textContent;
const msg = `Finalizado em:  ${period} . \n\n Deseja encerrar?`;

if(!confirm(msg)) return;

	const garage = getGarage().filter(c => c.licence !== licence);
	localStorage.garage = JSON.stringify(garage);

	

	renderGarage();

};
	//para impressao no console

	const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

renderGarage();
     $("#btnSave").addEventListener("click", e => {

	const inpMensagem = $("#inpMensagem").value;

if (!inpMensagem) {
	alert("Registre sua mensagem !");
	return;
}

	const impressao = { inpMensagem, time: new Date() }

//colocar aqui console.log( impressao para imprimir no console)
const garage = getGarage();
garage.push(impressao);

localStorage.garage = JSON.stringify(garage);
	

	addToMensagem(impressao);

	$("#inpMensagem").value = "";


});
$("#garage").addEventListener("click", (e) => {
	if(e.target.className === "delete")
	checkOut(e.target.parentElement.parentElement.cells);
});

})()

