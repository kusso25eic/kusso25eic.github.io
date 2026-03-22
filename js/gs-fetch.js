document.getElementById('fetchBtn').addEventListener('click', fetchJson, false);

//JSON取得→年度・クォーターで抽出
async function fetchJson() {
	const resultDiv = document.getElementById('result');
	const newold = document.querySelector('input[name="newold"]:checked').value; //科目構成を取得
	const year = document.querySelector('input[name="year"]:checked').value; //年度を取得
	const quarter = document.querySelector('input[name="quarter"]:checked').value; //クォーターを取得

	try {
		const response = await fetch('../json/gs.json'); //JSON取得
		const json = await response.json();
		const jsonSelected = json[newold][year][quarter]; //科目構成・年度・クォーターで抽出
		renderTable(jsonSelected, resultDiv)
	} catch (error) {
		document.getElementById('result').textContent = 'error';
	}
}

//テーブル生成
function renderTable(data, container) {
	const rowKeys = Object.keys(data); //行(時限)
	const columnKeys = Object.keys(data[rowKeys[0]]); //列(科目)
	let table = '<table border="1" class="gs-table"><tr><th></th>';

	//第1行(科目)
	for (const columnkey of columnKeys) {
		table += `<th>${columnkey}</th>`;
	}
	table += `</tr>`;

	//第2～行(時限+データ)
	for (const rowkey of rowKeys) {
		table += `<tr><th>${rowkey}</th>`;
		for (const columnkey of columnKeys) {
			let value = data[rowkey][columnkey];
			if (value == '0') {
				value = ''
			}
			table += `<td>${value}</td>`;
		}
		table += `</tr>`;
	}
	table += `</table>`;
	container.innerHTML = table;
}