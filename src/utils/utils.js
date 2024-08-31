/**
 * @param {Object} errors
 * @param {string} field
 * @returns {Array}
 */

export const formatErrorField = (errors, field) => {
  return errors[field] || null;
};
export function formatTimestamp(isoString) {
  const dt = new Date(isoString);
  const now = new Date();
  const difference = now - dt;
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(difference / (1000 * 60)) % 60;
  
  const day = dt.getUTCDate().toString().padStart(2, "0");
  const month = (dt.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dt.getUTCFullYear().toString().slice(-2);
  const formattedDate = `${day}/${month}/${year}`;
  
  let elapsedTime;
  if (years > 0) {
    elapsedTime = `il y a ${years} année${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    elapsedTime = `il y a ${months} mois`;
  } else if (days > 0) {
    elapsedTime = `il y a ${days} jour${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    elapsedTime = `il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  } else {
    elapsedTime = `il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return (
    <>
      {formattedDate} <span className="underline underline-offset-4">{elapsedTime}</span>
    </>
  );
}

