let revenu = 0;
let depenses = JSON.parse(localStorage.getItem('depenses')) || [];

function setRevenu() {
  revenu = parseFloat(document.getElementById('revenu').value);
  if (isNaN(revenu) || revenu <= 0) {
    alert("Veuillez entrer un montant valide pour les revenus.");
    return;
  }
  document.getElementById('budget-section').style.display = 'none';
  document.getElementById('expense-section').style.display = 'block';
  afficherSolde();
  afficherListeDepenses();
}

function ajouterDepense() {
  const description = document.getElementById('description').value;
  const montant = parseFloat(document.getElementById('montant').value);
  if (!description || isNaN(montant) || montant <= 0) {
    alert("Veuillez entrer une description et un montant valide.");
    return;
  }
  const depense = { description, montant };
  depenses.push(depense);
  localStorage.setItem('depenses', JSON.stringify(depenses));
  document.getElementById('description').value = '';
  document.getElementById('montant').value = '';
  afficherSolde();
  afficherListeDepenses();
}

function afficherSolde() {
  const totalDepenses = depenses.reduce((total, depense) => total + depense.montant, 0);
  const solde = revenu - totalDepenses;
  const soldeElement = document.getElementById('solde');
  soldeElement.textContent = `Solde restant : ${solde.toFixed(2)} €`;
  soldeElement.style.color = solde >= 0 ? 'green' : 'red';
}

function afficherListeDepenses() {
  const liste = document.getElementById('liste-depenses');
  liste.innerHTML = '';
  depenses.forEach((depense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${depense.description} : ${depense.montant.toFixed(2)} € <button onclick="supprimerDepense(${index})">Supprimer</button>`;
    liste.appendChild(li);
  });
}

function supprimerDepense(index) {
  depenses.splice(index, 1);
  localStorage.setItem('depenses', JSON.stringify(depenses));
  afficherSolde();
  afficherListeDepenses();
}
