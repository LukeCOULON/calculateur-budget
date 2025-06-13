const categories = [
  { name: 'Logement', percentage: 30 },
  { name: 'Alimentation', percentage: 15 },
  { name: 'Transports', percentage: 10 },
  { name: 'Loisirs', percentage: 5 },
  { name: 'Épargne', percentage: 10 },
  { name: 'Autres', percentage: 30 }
];

let revenu = 0;

function setRevenu() {
  revenu = parseFloat(document.getElementById('revenu').value);
  if (isNaN(revenu) || revenu <= 0) {
    alert("Veuillez entrer un montant valide pour les revenus.");
    return;
  }
  document.getElementById('budget-section').style.display = 'none';
  document.getElementById('expense-section').style.display = 'block';
  afficherDepenses();
  afficherSolde();
}

function afficherDepenses() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';
  categories.forEach(cat => {
    const montant = (revenu * cat.percentage / 100).toFixed(2);
    const li = document.createElement('li');
    li.innerHTML = `${cat.name} : ${montant} €`;
    expenseList.appendChild(li);
  });
  afficherGraphique();
}

function afficherSolde() {
  const totalDepenses = categories.reduce((total, cat) => total + (revenu * cat.percentage / 100), 0);
  const solde = revenu - totalDepenses;
  const soldeElement = document.getElementById('solde');
  soldeElement.textContent = `Solde restant : ${solde.toFixed(2)} €`;
  soldeElement.style.color = solde >= 0 ? 'green' : 'red';
}

function afficherGraphique() {
  const ctx = document.getElementById('expense-chart').getContext('2d');
  const labels = categories.map(cat => cat.name);
  const data = categories.map(cat => revenu * cat.percentage / 100);
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', '#ffb3e6']
      }]
    }
  });
}
