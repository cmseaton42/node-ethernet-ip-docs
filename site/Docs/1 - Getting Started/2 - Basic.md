# Basic Use Cases

## Getting Connected

```javascript
const PLC = new Controller();

// Controller.connect(IP_ADDR[, SLOT])
// NOTE: SLOT = 0 (default) - 0 if CompactLogix
PLC.connect("192.168.1.1", 0).then(() => {
    console.log(PLC.properties);
});
```

### Controller.prototype.properties
```javascript
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

## Set the Clock of the Controller

> **NOTE**
>
> `Controller.prototype.readWallClock` and `Controller.prototype.writeWallClock` are not currently supported by **CompactLogix** controllers

Sync Controller WallClock to PC Datetime

```javascript
const PLC = new Controller();

PLC.connect("192.168.1.1", 0).then(async () => {
    // Accepts a JS Date Type
    // Controller.writeWallClock([Date])
    await PLC.writeWallClock(); // Defaults to 'new Date()'
});
```

Set Controller WallClock to a Specific Date

```javascript
const PLC = new Controller();

PLC.connect("192.168.1.1", 0).then(async () => {
    const partyLikeIts1999 = new Date('December 17, 1999 03:24:00');
    await PLC.writeWallClock(partyLikeIts1999); // Pass a custom Datetime
});
```

## Reading Tags

> **NOTE**
>
> Currently, the `Tag` Class only supports *Atomic* datatypes (SINT, INT, DINT, REAL, BOOL). Not to worry, support for STRING, ARRAY, and UDTs are in the plans and coming soon! =]

Reading Tags `Individually`...

```javascript
const PLC = new Controller();

// Create Tag Instances
const fooTag = new Tag("contTag"); // Controller Scope Tag
const barTag = new Tag("progTag", "prog"); // Program Scope Tag in PLC Program "prog"

PLC.connect("192.168.1.1", 0).then(async () => {
    await PLC.readTag(fooTag);
    await PLC.readTag(barTag);

    console.log(fooTag.value);
    console.log(barTag.value);
});
```

Reading Tags as a `Group`...
```javascript
const PLC = new Controller();
const group = new TagGroup();

// Add some tags to group
group.add(new Tag("contTag")); // Controller Scope Tag
group.add(new Tag("progTag", "prog")); // Program Scope Tag in PLC Program "prog"

PLC.connect("192.168.1.1", 0).then(async () => {
    await PLC.readTagGroup(group);

    // log the values to the console
    group.forEach(tag => {
        console.log(tag.value);
    });
});
```

## Writing Tags

Writing Tags `Individually`...

> **NOTE**
> 
> You *MUST* read the tags first or manually provide a valid CIP datatype. The following examples are taking the latter approach.

```javascript
const { Controller, Tag, CIP } = require("ethernet-ip");
const { DINT, BOOL } = CIP.DataTypes.Types;

const PLC = new Controller();

// Create Tag Instances
const fooTag = new Tag("contTag", null, DINT); // Controller Scope Tag
const barTag = new Tag("progTag", "prog", BOOL); // Program Scope Tag in PLC Program "prog"

PLC.connect("192.168.1.1", 0).then(async () => {

    // First way to write a new value
    fooTag.value = 75;
    await PLC.writeTag(fooTag);

    // Second way to write a new value
    await PLC.writeTag(barTag, true);

    console.log(fooTag.value);
    console.log(barTag.value);
});
```

Writing Tags as a `Group`...
```javascript
const { Controller, Tag, TagGroup, CIP } = require("ethernet-ip");
const { DINT, BOOL } = CIP.DataTypes.Types;

const PLC = new Controller();
const group = new TagGroup();

// Create Tag Instances
group.add(new Tag("contTag", null, DINT)); // Controller Scope Tag
group.add(new Tag("progTag", "prog", BOOL)); // Program Scope Tag in PLC Program "prog"

PLC.connect("192.168.1.1", 0).then(async () => {
    // Set new values
    fooTag.value = 75;
    barTag.value = true;

    // Will only write tags whose Tag.controller_tag !== Tag.value
    await PLC.writeTagGroup(group);

    group.forEach(tag => {
        console.log(tag.value);
    });
});
```