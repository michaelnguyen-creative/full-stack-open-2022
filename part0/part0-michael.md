# Part 0: Michael's submission
Using Mermaid syntax
### Exercise 0.4 solution

```
{
    sequenceDiagram
        participant B as Browser
        participant S as Server
        B->>S: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
        note over S: Server appends new note payload to current note array
        S-->>B: HTTP Status code 302 - Redirect
        B->>S: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
        S-->>B: HTML-code
        note over B: Browser reloads Note page triggering three more requests
        B->>S: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
        S-->>B: main.css
        B->>S: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
        S-->>B: main.js
        B->>S: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
        S-->>B: [..., {content: "how so?", date: "2022-11-02T09:40:51.543Z"}]
}
```

### Exercise 0.5 solution

```
{
    sequenceDiagram
        participant B as Browser
        participant S as Server
        B->>S: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
        S-->>B: spa (HTML-code)
        B->>S: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
        S-->>B: main.css
        B->>S: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        S-->>B: spa.js
        note over B: Browser executes JS codes requesting notes data from server
        B->>S: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
        S-->>B: JSON notes data
        note over B: Executes JS codes that parse JSON note data into a JS array object, <br /> Then map over the array elements, <br /> and display the notes with redrawNote()
}
```

### Exercise 0.6 solution
```
{
    sequenceDiagram
        participant B as Browser
        participant S as Server
        note over B: Browser executes event handler that<br/>appends the new note to notes array,<br/> and re-render the note list on the page,<br/>then send the new note to server as a payload
        B->>S: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        note over S: Server updates original JSON notes data with the payload
        S-->>B: HTTP status code 201 - Created

}
```
