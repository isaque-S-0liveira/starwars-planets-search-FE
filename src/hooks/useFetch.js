function useFetch() {
  const makeFetch = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const json = await response.json();
    return json;
  };

  return { makeFetch };
}

export default useFetch;
