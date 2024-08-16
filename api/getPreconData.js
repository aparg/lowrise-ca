export const getPreconData = async () => {
  const res = await fetch(
    "https://api.homebaba.ca/api/preconstructions/?page_size=4",
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }
  const response = await res.json();
  return response.results;
};
