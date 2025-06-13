function calculerBudget() {
  const revenu = parseFloat(document.getElementById('revenu').value);
  const enfants = parseInt(document.getElementById('enfants').value);
  const aides = parseFloat(document.getElementById('aides').value);
  const credits = parseFloat(document.getElementById('credits').value);

  if (isNaN(revenu) || revenu <= 0) {
    alert("Veuillez entrer un revenu valide.");
    return;
  }

  // Dépenses de base
  const logement = revenu * 0.30;
  const alimentation = revenu * 0.15;
  const transports = revenu * 0.10;
  const sante = revenu * 0.05;
  const loisirs = revenu * 0.05;
  const epargne = revenu * 0.10;
  const autres = revenu * 0.10;

  // Ajustements en fonction des enfants
  const depensesEnfants = enfants * 100; // Exemple : 100 € par enfant

  // Calcul du total des dépenses
  const totalDepenses = logement + alimentation + transports + sante + loisirs + epargne + autres + depensesEnfants + credits - aides;

  // Affichage des résultats
  const resultSection = document.getElementById('result-section');
  const repartitionUl = document.getElementById('repartition');
  repartitionUl.innerHTML = `
    <li>Logement: ${logement.toFixed(2)} €</li>
    <li>Alimentation: ${alimentation.toFixed(2)} €</li>
    <li>Transports: ${transports.toFixed(2)} €</li>
    <li>Santé: ${sante.toFixed(2)} €</li>
    <li>Loisirs: ${loisirs.toFixed(2)} €</li>
    <li>Épargne: ${epargne.toFixed(2)} €</li>
    <li>Autres: ${autres.toFixed(2)} €</li>
    <li>Enfants: ${depensesEnfants.toFixed(2)} €</li>
    <li>Crédits: ${credits.toFixed(2)} €</li>
    <li>Aides sociales: -${aides.toFixed(2)} €</li>
  `;
  document.getElementById('totalDepenses').textContent = `Total des Dépenses: ${totalDepenses.toFixed(2)} €`;
  document.getElementById('solde').textContent = `Solde restant: ${(revenu - totalDepenses).toFixed(2)} €`;

  resultSection.style.display = 'block';
}
