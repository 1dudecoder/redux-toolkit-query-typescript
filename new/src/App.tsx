import { useEffect, useState } from "react";
import "./App.css";
import {
  contactTypes,
  useGetcontactApiQuery,
  usePostcontactapiMutation,
  useDeletecontactapiMutation,
  useUpdatecontactapiMutation
} from "./fetures/contactsquery";

function App() {
  const contactsdata = {
    id: "4",
    name: "gogo",
    age: "52",
  };

  const updatecontact = {
    id: "2",
    name: "himanshu",
    age: "78",
  }

  const [count, setCount] = useState(0);
  const [apidata, setApiData] = useState<contactTypes[]>();
  const { isLoading, isError, isFetching, data } = useGetcontactApiQuery();
  const [postcontactapi] = usePostcontactapiMutation();
  const [deletecontactapi] = useDeletecontactapiMutation();
  const [updatecontactapi] = useUpdatecontactapiMutation();

  useEffect(() => {
    if (isError) {
      console.log(isError, "got an error");
    } else if (isLoading) {
      console.log(isLoading, "we are loading");
    } else if (isFetching) {
      console.log(isFetching, "we are isFetching");
    } else {
      console.log(data, "we get the data");
      setApiData(data);
    }
  }, [isError, data]);

  useEffect(() => {
    if (data) {
      if (data.filter((item) => item.name != "ashish")) {
        //this is adding new contact to the json server
        postcontactapi(contactsdata);

        setTimeout(()=>{
          deletecontactapi("1");
        },5000)

        setTimeout(() => {
          updatecontactapi(updatecontact);
        }, 1000);

      }
    }
  }, [apidata]);

  return (
    <div className="App">
      <h1>hellow react query </h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <br />

      {data && data.map((item) => <p key={item.id}>{item.name}</p>)}
    </div>
  );
}

export default App;
