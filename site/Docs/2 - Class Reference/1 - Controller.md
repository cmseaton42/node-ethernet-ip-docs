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

### connect(IP_Addr[, slot])

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

### readControllerProps()

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

### readWallClock()[^first]

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

### writeWallClock(date)[^first]

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

### readTag(tag)

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

### writeTag(tag[, value])

| Arg   | Type | Default[^second] | Description                                |
| :---- | :--- | :--------------- | :----------------------------------------- |
| tag   | Tag  | n/a              | Tag to write to target controller          |
| value | n/a  | n/a              | Value to written to controller (see below) |

```js
// write tag from target

// OPTION 1: schedule a tag to written
tag.value = 27;

PLC.writeTag(tag)
    .then(() => {
        console.log(tag.value);
    })
    .catch(e => {
        console.log(e);
    });

// OPTION 2: declare value to change to
PLC.writeTag(tag, 27)
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

### readTagGroup(group)

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

### writeTagGroup(group)

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

### subscribe(tag)

| Arg | Type | Default[^second] | Description                                   |
| :-- | :--- | :--------------- | :-------------------------------------------- |
| tag | Tag  | n/a              | Tag to be registered to controller scan group |

```js
// Add tag to scan group
PLC.subscribe(new Tag("someTagToMonitor"));

// monitoring will not begin until PLC.scan() is called
```

> **NOTE**
>
> It is reccommended that the user keep the number of tags to a minimum in the scan group as this will help keep bandwidth consumption to a minimum. For reccommended use of the scan group, see below.

```js
/* Scan group best practice */

// Build a group to read on handshake change
const group = new TagGroup();
group.add("fistTag");
group.add("secondTag");

// Subscribe to some event tag - we will call it 'handshake'
const tag = new Tag("handshake");
PLC.subscribe(tag);

// Begin Scanning
PLC.scan();

// register change event on handshake
tag.on("Changed", (tag, lastValue) => {
    // check against some condition, in this case if handshake is 10
    if (tag.value === 10) {
        PLC.readTagGroup(group)
            .then(() => {
                // Data has been read, confirm to PLC
                // by setting handshake to 110 in this case
                handshake.value = 110;
            })
            .catch(e => {
                // log error
                console.log(e);

                // Tell PLC a failure occurred, 111 in this case
                handshake.value = 111;
            });
    }
});
```

The above usage of the controller scan group allows the user to monitor select tags for a queue to read a group of tags without consuming much bandwidth.

### scan()

This method will begin polling tags of the scan group for changes at the scan rate provided from the user (200 ms default).

### pauseScan()

This method will pause polling of the scan group.

### forEach(callback)

| arg      | type     | default[^first] | description                      |
| :------- | :------- | :-------------- | :------------------------------- |
| callback | Function | n/a             | Callback function to handle loop |

```js
// Iterate over each tag registered to the scan group
// --> The callback is passed a tag
PLC.forEach(tag => {
    console.log(tag.value);
});
```

[^first]: `readWallClock` and `writeWallClock` methods do not work with CompactLogix Controllers
[^second]: If a default other than `n/a` is shown then the argument is _optional_
