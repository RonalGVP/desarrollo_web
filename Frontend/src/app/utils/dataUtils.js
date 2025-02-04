export const filterDataByDateRange = (data, dateRange) => {
  if (!data?.time) return data;

  const filteredIndices = data.time
    .map((time, index) => {
      const date = new Date(time);
      return date >= dateRange.start && date <= dateRange.end ? index : null;
    })
    .filter((index) => index !== null);

  const filteredData = {};
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      filteredData[key] = filteredIndices.map((index) => data[key][index]);
    } else {
      filteredData[key] = data[key];
    }
  });

  return filteredData;
};