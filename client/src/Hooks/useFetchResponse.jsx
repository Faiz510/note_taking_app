import { useEffect, useState } from "react";
import axios from "axios";

const useFetchResponse = (type, url, token) => {
  const [response, setResponse] = useState({});
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    // get data function
    const fetchGetData = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res;
        setResponse(data);
        setFetchLoading(false);
        console.log(response);
      } catch (error) {
        setFetchError(error.response.data.message);
        setFetchLoading(false);
      }
    };

    // del function
    const fetchDelData = async () => {
      try {
        await axios.delete(`${url}`, {
          data: token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // signOutHandler();
      } catch (error) {
        console.error(error);
      }
    };
    //////////////////////////////
    if (type === "get") {
      fetchGetData();
    } else if (type === "delete") {
      fetchDelData();
    }
  }, [type, url, token]);

  return { response, fetchLoading, fetchError };
};

export default useFetchResponse;
