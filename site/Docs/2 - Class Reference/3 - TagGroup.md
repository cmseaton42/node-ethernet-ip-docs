# TagGroup Class

---

The `TagGroup` class can be accessed as follows.

```js
// with es6 object destructuring
const { TagGroup } = require("ethernet-ip");

// or as follows
const ethernet = require("ethernet-ip");
const TagGroup = ethernet.TagGroup;
```

---

# Create New Instance

Making a new `TagGroup` instance

```js
const group = new TagGroup();
```

---

# Instance Properties

| Property | Type   | Description                             |
| :------- | :----- | :-------------------------------------- |
| length   | Number | Gets number of tags registered in group |

All properties listed below can be accessed as follows:

```js
const group = new TagGroup();

console.log(group.<property>); // logs return from property accessor to console
```

---

# Instance Methods

| Method                       | Description                                          |
| :--------------------------- | :--------------------------------------------------- |
| add                          | Adds Tag instance to group                           |
| remove                       | Removes Tag instance from group                      |
| forEach                      | Iterates over Tag instances registered in the group  |
| generateReadMessageRequests  | Returns a multi service read request service buffer  |
| parseReadMessageResponses    | Parses a multi service read response service buffer  |
| generateWriteMessageRequests | Returns a multi service write request service buffer |
| parseWriteMessageRequests    | Parses a multi service write response service buffer |

### add

| arg | type | default[^first] | description                            |
| :-- | :--- | :-------------- | :------------------------------------- |
| tag | Tag  | n/a             | Tag instance to be registered to group |

```js
const group = new TagGroup();

group.add(new Tag("sampleTag"));
```

### remove

| arg | type | default[^first] | description                              |
| :-- | :--- | :-------------- | :--------------------------------------- |
| tag | Tag  | n/a             | Tag instance to be deregistered to group |

```js
group.remove(new Tag("sampleTag"));
```

### forEach

| arg      | type     | default[^first] | description                      |
| :------- | :------- | :-------------- | :------------------------------- |
| callback | Function | n/a             | Callback function to handle loop |

```js
// Iterate over each tag registered to the tag group
// --> The callback is passed a tag
group.forEach(tag => {
    console.log(tag.value);
});
```

### generateReadMessageRequests

| return       | type  | description                                       |
| :----------- | :---- | :------------------------------------------------ |
| ReadGroupMSG | Array | Read tag multi service request buffers to be sent |

Returned array object structure

```js
{
    data: Buffer,
    tag_ids: Array // Array of Tag IDs embedded in data buffer
}
```

### parseReadMessageResponses

| arg       | type  | description                                            |
| :-------- | :---- | :----------------------------------------------------- |
| responses | Array | Array of read tag service request responses            |
| ids       | Array | Array of Tag IDs that were sent in the service request |

### generateWriteMessageRequests

| return        | type  | description                                        |
| :------------ | :---- | :------------------------------------------------- |
| WriteGroupMSG | Array | Write tag multi service request buffers to be sent |

> **NOTE**
>
> If no value is provided then the message buffer will be generated with the _staged_ value if one exists.

| return   | type   | description                         |
| :------- | :----- | :---------------------------------- |
| WriteMSG | Buffer | Write tag request buffer to be sent |

### parseReadMessageResponses

| arg       | type  | description                                            |
| :-------- | :---- | :----------------------------------------------------- |
| responses | Array | Array of read tag service request responses            |
| ids       | Array | Array of Tag IDs that were sent in the service request |

[^first]: If a default other than `n/a` is shown then the argument is _optional_
