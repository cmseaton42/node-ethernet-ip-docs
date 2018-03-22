# Controller Class

---

The `Controller` class can be accessed as follows.

```js
// with es6 object destructuring
const { Controller } = require("ethernet-ip");

// or as follows
const ethernet = require("ethernet-ip");
const Controller = ethernet.Controller;
```

---

# Create New Instance

Making a new `Controller` instance

```js
// controller scope
const PLC = new Controller();

PLC.connect("192.168.1.0").then(() => {
    console.log(PLC.properties);
});
```

---

# Instance Properties

| Property   | Type    | Description                                                        |
| :--------- | :------ | :----------------------------------------------------------------- |
| properties | Object  | Gets controller properties object (see below)                      |
| scan_rate  | Number  | Gets/Sets the scan rate of the internal controller scan group (ms) |
| scanning   | Boolean | Gets the state of the internal scan group                          |
| time       | String  | Gets the last read controller timestamp - formatted                |

All properties listed below can be accessed as follows:

```js
// instatiate a tag
const PLC = new Controller("tagname");

console.log(PLC.<property>); // logs return from property accessor to console
```

```js
// controller properties object
{
    name: String, // eg "1756-L83E/B"
    serial_number: Number,
    slot: Number,
    time: Date, // last read controller WallClock datetime
    path: Buffer,
    version: String, // eg "30.11"
    status: Number,
    faulted: Boolean,  // will be true if any of the below are true
    minorRecoverableFault: Boolean,
    minorUnrecoverableFault: Boolean,
    majorRecoverableFault: Boolean,
    majorUnrecoverableFault: Boolean,
    io_faulted: Boolean
}
```

---

# Instance Methods

| Method _\*ASYNC_        | Description                                                        |
| :---------------------- | :----------------------------------------------------------------- |
| connect\*               | Attempts to establish a connection with a target controller        |
| readControllerProps\*   | Reads the target's identity object properties                      |
| readWallClock\*[^first] | Reads the target's wallclock                                       |
| writeWallClock\*        | Sets the target's wallclock                                        |
| readTag\*               | Reads the value of a Tag instance from target                      |
| writeTag\*              | Writes the value of a Tag instance to target                       |
| readTagGroup\*          | Reads values of all Tag instances registered in the TagGroup       |
| writeTagGroup\*         | Writes values of all Tag instances registered in the TagGroup      |
| subscribe               | Registers a Tag instance to the controller scan group              |
| scan                    | Begins monitoring all Tags registered in the controller scan group |
| pauseScan               | Pauses monitoring all Tags registered in the controller scan group |
| forEach                 | Iterates over each tag in the controller scan group                |

> **NOTE**
>
> All `ASYNC` methods return promises that resolve once the request has been fullfilled or rejected in case of a failure or timeout

> **NOTE**
>
> All `ASYNC` methods that make network requests will timeout after 10s (default)

### connect

| Arg     | Type   | Default[^second] | Description                             |
| :------ | :----- | :--------------- | :-------------------------------------- |
| IP_Addr | String | n/a              | IPv4 IP Address string                  |
| slot    | Number | 0                | Chassis slot number (0 if CompactLogix) |

| Return  | Type    | Description                               |
| :------ | :------ | :---------------------------------------- |
| promise | Promise | Resolves when a connection is established |

```js
// connect with controller
PLC.connect("192.168.1.1")
    .then(() => {
        console.log("connection established");
    })
    .catch(e => {
        console.log("connection failed");
        console.log(e);
    });
```

### readControllerProps

```js
// read controller properties
PLC.readControllerProps()
    .then(() => {
        console.log(`Properties: ${PLC.properties}`);
    })
    .catch(e => {
        console.log(e);
    });
```

### readWallClock[^first]

```js
// read controller wallclock
PLC.readWallClock()
    .then(() => {
        console.log(`Time: ${PLC.properties.time}`);
    })
    .catch(e => {
        console.log(e);
    });
```

### writeWallClock[^first]

| Arg  | Type | Default[^second] | Description                                     |
| :--- | :--- | :--------------- | :---------------------------------------------- |
| date | Date | new Date()       | Datetime to set the controller's wallclock time |

```js
// read controller wallclock
PLC.writeWallClock()
    .then(() => {
        console.log(`Time: ${PLC.properties.time}`);
    })
    .catch(e => {
        console.log(e);
    });
```

### readTag

| Arg | Type | Default[^second] | Description                           |
| :-- | :--- | :--------------- | :------------------------------------ |
| tag | Tag  | n/a              | Tag to be read from target controller |

```js
// read tag from target
const tag = new Tag("someTag");

PLC.readTag(tag)
    .then(() => {
        console.log(tag.value);
    })
    .catch(e => {
        console.log(e);
    });
```

### writeTag

| Arg | Type | Default[^second] | Description                       |
| :-- | :--- | :--------------- | :-------------------------------- |
| tag | Tag  | n/a              | Tag to write to target controller |

```js
// write tag from target
tag.value = 27;

PLC.writeTag(tag)
    .then(() => {
        console.log(tag.value);
    })
    .catch(e => {
        console.log(e);
    });
```

> **NOTE**
>
> If you wish to write a value to a tag you must either provide an explicit type when creating the tag instance or read the tag from the controller before attempting to write.

### readTagGroup

| Arg   | Type     | Default[^second] | Description                                |
| :---- | :------- | :--------------- | :----------------------------------------- |
| group | TagGroup | n/a              | TagGroup to be read from target controller |

```js
// read tag from target
const tag1 = new Tag("someTag");
const tag2 = new Tag("someOtherTag");
const group = new TagGroup();

group.add(tag1);
group.add(tag2);

PLC.readTagGroup(group)
    .then(() => {
        console.log(tag1.value, tag2.value);
    })
    .catch(e => {
        console.log(e);
    });
```

### writeTagGroup

| Arg   | Type     | Default[^second] | Description                               |
| :---- | :------- | :--------------- | :---------------------------------------- |
| group | TagGroup | n/a              | TagGroup to be write to target controller |

```js
// read tag from target
tag1.value = 89;
tag2.value = true;

PLC.writeTagGroup(group)
    .then(() => {
        console.log(tag1.value, tag2.value);
    })
    .catch(e => {
        console.log(e);
    });
```

[^first]: `readWallClock` and `writeWallClock` methods do not work with CompactLogix Controllers
[^second]: If a default other than `n/a` is shown then the argument is _optional_
