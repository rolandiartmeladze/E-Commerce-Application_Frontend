function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours() + 4;
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  return formattedDate;
}
export default formatDate;
