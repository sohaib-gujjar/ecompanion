const API_BASE_PATH = "http://localhost:3001/"

export function getFromServer (url, context) {
    return new Promise((resolve, reject) => {

        fetch(API_BASE_PATH + url, {
            method: 'GET',
            headers: {
                'authorization' : context.user.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.ok) {
                try {
                    resolve(response.json())
                }
                catch(err) {
                    reject(err)
                }
            }
            else {
                throw new Error({
                    status: response.status,
                    text: response.text,
                    message: response.json()
                })
            }
        })
        .catch(err => {
            reject(err)
        })
    })
}

export function postToServer(url, body, context) {
    return new Promise((resolve, reject) => {

        fetch(API_BASE_PATH + url, {
            method: 'POST',
            headers: {
                'authorization' : context.user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if(response.ok) {
                try {
                    resolve(response.json())
                }
                catch(err) {
                    reject(err)
                }
            }
            else {
                throw new Error({
                    status: response.status,
                    text: response.text,
                    message: response.json()
                })
            }
        })
        .catch(err => {
            reject(err)
        })
    })
}

export function api_get (url) {
    return new Promise((resolve, reject) => {

        fetch(API_BASE_PATH + url, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.ok) {
                try {
                    resolve(response.json())
                }
                catch(err) {
                    throw new Error(err)
                }
            }
            else {
                throw new Error({
                    status: response.status,
                    text: response.text,
                    message: response.json()
                })
            }
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}
/*
function AlertDismissible({ message }) {
    const [show, setShow] = useState(true);
  
    if(show) return (
      <Container>
        <Alert show={show} variant="success">
          <Alert.Heading>Error!</Alert.Heading>
          <p>
            {message}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>
  
        {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
      </Container>
    )
    else return(<></>)
  }

function showAlert(message) {
    ReactDOM.render(
        <AlertDismissible />,
        document.getElementById('alert')
      );
}

*/