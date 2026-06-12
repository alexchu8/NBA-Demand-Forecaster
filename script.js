const COEFFS = {
  adjusted_intercept: 0.9102, 
  
  home_win_pct: 0.2707,  
  visitor_win_pct: 0.0539, 
  is_rivalry: 0.0239,    
  is_superstar: 0.0334,  
  is_playoff: 0.0364,    
  
  is_mon: -0.0013,       
  is_tue: 0.0019,        
  is_thu: 0.0271,        
  is_fri: 0.0350,        
  is_sat: 0.0453,        
  is_sun: 0.0302         
};

const calculateBtn = document.getElementById('calculateBtn');
const resultSpan = document.getElementById('result');
const badge = document.getElementById('badge');

calculateBtn.addEventListener('click', () => {
  const day = document.getElementById('dayOfWeek').value;
  
  const homeWinPct_diff = (parseFloat(document.getElementById('homeWinPct').value) / 100) - 0.50;
  const visitorWinPct_diff = (parseFloat(document.getElementById('visitorWinPct').value) / 100) - 0.50;

  const isSuperstar = document.getElementById('isSuperstar').checked ? 1 : 0;
  const isRivalry = document.getElementById('isRivalry').checked ? 1 : 0;
  const isPlayoff = document.getElementById('isPlayoff').checked ? 1 : 0;

  let prediction = COEFFS.adjusted_intercept;

  prediction += (homeWinPct_diff * COEFFS.home_win_pct);
  prediction += (visitorWinPct_diff * COEFFS.visitor_win_pct);
  prediction += (isSuperstar * COEFFS.is_superstar);
  prediction += (isRivalry * COEFFS.is_rivalry);
  prediction += (isPlayoff * COEFFS.is_playoff);

  if (day === 'monday') prediction += COEFFS.is_mon;
  if (day === 'tuesday') prediction += COEFFS.is_tue;
  if (day === 'thursday') prediction += COEFFS.is_thu;
  if (day === 'friday') prediction += COEFFS.is_fri;
  if (day === 'saturday') prediction += COEFFS.is_sat;
  if (day === 'sunday') prediction += COEFFS.is_sun;
  
 
  
  const finalPercentage = (prediction * 100).toFixed(2);
  resultSpan.textContent = finalPercentage + '%';
  
  
  badge.className = 'badge'; 
  if (prediction >= 1.05) {
    badge.textContent = "EXTREME DEMAND (SRO)";
    badge.classList.add('extreme');
  } else if (prediction >= 0.98) {
    badge.textContent = "SELLOUT LIKELY";
    badge.classList.add('high');
  } else {
    badge.classList.add('hidden');
  }
});


document.addEventListener('DOMContentLoaded', () => {
    calculateBtn.click();
});
