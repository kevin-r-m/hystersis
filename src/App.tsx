import { useEffect, useState } from "react";
import { fakeApiCall } from "./api/actions";
import { useSmoothLoading } from "./hooks/useSmoothLoading";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const showLoading = useSmoothLoading(isFetching);

  useEffect(() => {
    setIsFetching(true);
    fakeApiCall("Smooth Hello, World!", 600)
      .then((res) => {
        setData(res);
      })
      .finally(() => setIsFetching(false));
  }, []);

  if (showLoading) return <div>Loading...</div>;

  if (data) return <div>{data}</div>;
}

export default App;
