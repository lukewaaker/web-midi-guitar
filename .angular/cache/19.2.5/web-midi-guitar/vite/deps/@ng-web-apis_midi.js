import {
  DOCUMENT
} from "./chunk-BGDV5MPB.js";
import {
  InjectionToken,
  Observable,
  Pipe,
  __async,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  inject,
  map,
  merge,
  of,
  setClassMetadata,
  share,
  shareReplay,
  startWith,
  switchMap,
  throwError,
  ɵɵdefinePipe
} from "./chunk-RXD3LYH4.js";

// node_modules/@ng-web-apis/common/fesm2022/ng-web-apis-common.mjs
var WA_WINDOW = new InjectionToken("[WA_WINDOW]", {
  factory: () => {
    const {
      defaultView
    } = inject(DOCUMENT);
    if (!defaultView) {
      throw new Error("Window is not available");
    }
    return defaultView;
  }
});
var WINDOW = WA_WINDOW;
var WA_ANIMATION_FRAME = new InjectionToken("[WA_ANIMATION_FRAME]", {
  factory: () => {
    const {
      requestAnimationFrame,
      cancelAnimationFrame
    } = inject(WINDOW);
    const animationFrame$ = new Observable((subscriber) => {
      let id = NaN;
      const callback = (timestamp) => {
        subscriber.next(timestamp);
        id = requestAnimationFrame(callback);
      };
      id = requestAnimationFrame(callback);
      return () => {
        cancelAnimationFrame(id);
      };
    });
    return animationFrame$.pipe(share());
  }
});
var WA_CACHES = new InjectionToken("[WA_CACHES]", {
  factory: () => inject(WINDOW).caches
});
var WA_CRYPTO = new InjectionToken("[WA_CRYPTO]", {
  factory: () => inject(WINDOW).crypto
});
var WA_CSS = new InjectionToken("[WA_CSS]", {
  factory: () => inject(WINDOW).CSS ?? {
    escape: (v) => v,
    // eslint-disable-next-line no-restricted-syntax
    supports: () => false
  }
});
var WA_HISTORY = new InjectionToken("[WA_HISTORY]", {
  factory: () => inject(WINDOW).history
});
var WA_LOCAL_STORAGE = new InjectionToken("[WA_LOCAL_STORAGE]", {
  factory: () => inject(WINDOW).localStorage
});
var WA_LOCATION = new InjectionToken("[WA_LOCATION]", {
  factory: () => inject(WINDOW).location
});
var WA_NAVIGATOR = new InjectionToken("[WA_NAVIGATOR]", {
  factory: () => inject(WINDOW).navigator
});
var NAVIGATOR = WA_NAVIGATOR;
var WA_MEDIA_DEVICES = new InjectionToken("[WA_MEDIA_DEVICES]", {
  factory: () => inject(NAVIGATOR).mediaDevices
});
var WA_NETWORK_INFORMATION = new InjectionToken("[WA_NETWORK_INFORMATION]", {
  // @ts-ignore
  factory: () => inject(WA_NAVIGATOR).connection || null
});
var WA_PAGE_VISIBILITY = new InjectionToken("[WA_PAGE_VISIBILITY]", {
  factory: () => {
    const documentRef = inject(DOCUMENT);
    return fromEvent(documentRef, "visibilitychange").pipe(startWith(0), map(() => documentRef.visibilityState !== "hidden"), distinctUntilChanged(), shareReplay({
      refCount: false,
      bufferSize: 1
    }));
  }
});
var WA_PERFORMANCE = new InjectionToken("[WA_PERFORMANCE]", {
  factory: () => inject(WINDOW).performance
});
var WA_SCREEN = new InjectionToken("[WA_SCREEN]", {
  factory: () => inject(WINDOW).screen
});
var WA_SESSION_STORAGE = new InjectionToken("[WA_SESSION_STORAGE]", {
  factory: () => inject(WINDOW).sessionStorage
});
var WA_SPEECH_RECOGNITION = new InjectionToken("[WA_SPEECH_RECOGNITION]: [SPEECH_RECOGNITION]", {
  factory: () => {
    const windowRef = inject(WINDOW);
    return windowRef.speechRecognition || windowRef.webkitSpeechRecognition || null;
  }
});
var WA_SPEECH_SYNTHESIS = new InjectionToken("[WA_SPEECH_SYNTHESIS]", {
  factory: () => inject(WINDOW).speechSynthesis
});
var WA_USER_AGENT = new InjectionToken("[WA_USER_AGENT]", {
  factory: () => inject(NAVIGATOR).userAgent
});

// node_modules/@ng-web-apis/midi/fesm2022/ng-web-apis-midi.mjs
function between(value, min, max) {
  return value >= min && value <= max;
}
function aftertouch() {
  return (source) => source.pipe(filter(({
    data
  }) => between(data[0] ?? 0, 208, 223)));
}
function filterByChannel(channel) {
  return (source) => source.pipe(filter(({
    data
  }) => (data[0] ?? 0) % 16 === channel));
}
function filterById(id) {
  return (source) => source.pipe(filter(({
    target
  }) => target.id === id));
}
function filterByName(name) {
  return (source) => source.pipe(filter(({
    target
  }) => target.name === name));
}
function mainVolume() {
  return (source) => source.pipe(filter(({
    data
  }) => between(data[0] ?? 0, 176, 191) && data[1] === 7));
}
function modulationWheel() {
  return (source) => source.pipe(filter(({
    data
  }) => between(data[0] ?? 0, 176, 191) && data[1] === 1));
}
function notes() {
  return (source) => source.pipe(filter(({
    data
  }) => between(data[0] ?? 0, 128, 159)), map((event) => {
    if (between(event.data[0] ?? 0, 128, 143)) {
      event.data[0] += 16;
      event.data[2] = 0;
    }
    return event;
  }));
}
function pan() {
  return (source) => source.pipe(filter(({
    data
  }) => between(data[0] ?? 0, 176, 191) && data[1] === 10));
}
function pitchBend() {
  return (source) => source.pipe(filter(({
    data
  }) => between(data[0] ?? 0, 224, 239)));
}
function polyphonicAftertouch() {
  return (source) => source.pipe(filter(({
    data
  }) => between(data[0] ?? 0, 160, 175)));
}
function programChange() {
  return (source) => source.pipe(filter(({
    data
  }) => between(data[0] ?? 0, 208, 223)));
}
function sustainPedal() {
  return (source) => source.pipe(filter(({
    data
  }) => between(data[0] ?? 0, 176, 191) && data[1] === 64));
}
function toData() {
  return (source) => source.pipe(map(({
    data
  }) => data));
}
function toDataByte() {
  return (source) => source.pipe(map(({
    data
  }) => data[1] ?? 0));
}
function toStatusByte() {
  return (source) => source.pipe(map(({
    data
  }) => data[0] ?? 0));
}
function toTimeStamp() {
  return (source) => source.pipe(map(({
    timeStamp
  }) => timeStamp));
}
function toValueByte() {
  return (source) => source.pipe(map(({
    data
  }) => data[2] ?? 0));
}
function toFrequency(note, tuning = 440) {
  return 2 ** ((note - 69) / 12) * tuning;
}
var FrequencyPipe = class _FrequencyPipe {
  transform(note, tuning) {
    return toFrequency(note, tuning);
  }
  static ɵfac = function FrequencyPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FrequencyPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "frequency",
    type: _FrequencyPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FrequencyPipe, [{
    type: Pipe,
    args: [{
      standalone: true,
      name: "frequency"
    }]
  }], null, null);
})();
var WA_SYSEX = new InjectionToken("[WA_SYSEX]", {
  providedIn: "root",
  // eslint-disable-next-line no-restricted-syntax
  factory: () => false
});
var SYSEX = WA_SYSEX;
var WA_MIDI_ACCESS = new InjectionToken("[WA_MIDI_ACCESS]", {
  providedIn: "root",
  factory: () => __async(void 0, null, function* () {
    const navigatorRef = inject(WA_NAVIGATOR);
    const sysex = inject(SYSEX);
    return navigatorRef.requestMIDIAccess ? navigatorRef.requestMIDIAccess({
      sysex
    }) : Promise.reject(new Error("Web MIDI API is not supported"));
  })
});
var MIDI_ACCESS = WA_MIDI_ACCESS;
var WA_MIDI_INPUT = new InjectionToken("[WA_MIDI_INPUT]");
var MIDI_INPUT = WA_MIDI_INPUT;
function getPortsStream(ports) {
  return from(inject(MIDI_ACCESS).catch(() => null)).pipe(
    switchMap((access) => {
      const inputs = [];
      access?.[ports].forEach((input) => inputs.push(input));
      return access ? fromEvent(access, "statechange").pipe(map(() => inputs), startWith(inputs)) : of([]);
    }),
    // eslint-disable-next-line rxjs/no-sharereplay
    shareReplay(1)
  );
}
var WA_MIDI_INPUTS = new InjectionToken("[WA_MIDI_INPUTS]", {
  factory: () => getPortsStream("inputs")
});
var MIDI_INPUTS = WA_MIDI_INPUTS;
var WA_MIDI_MESSAGES = new InjectionToken("[WA_MIDI_MESSAGES]", {
  providedIn: "root",
  factory: () => from(inject(MIDI_ACCESS).catch((e) => e)).pipe(switchMap((access) => access instanceof Error ? throwError(access) : fromEvent(access, "statechange").pipe(startWith(null), switchMap(() => {
    const inputs = [];
    access.inputs.forEach((input) => inputs.push(input));
    return merge(...inputs.map((input) => fromEvent(input, "midimessage")));
  }))), share())
});
var MIDI_MESSAGES = WA_MIDI_MESSAGES;
var WA_MIDI_OUTPUT = new InjectionToken("[WA_MIDI_OUTPUT]");
var MIDI_OUTPUT = WA_MIDI_OUTPUT;
var WA_MIDI_OUTPUTS = new InjectionToken("[WA_MIDI_OUTPUTS]", {
  factory: () => getPortsStream("outputs")
});
var MIDI_OUTPUTS = WA_MIDI_OUTPUTS;
var WA_MIDI_SUPPORT = new InjectionToken("[WA_MIDI_SUPPORT]", {
  factory: () => !!inject(WA_NAVIGATOR).requestMIDIAccess
});
var MIDI_SUPPORT = WA_MIDI_SUPPORT;
var WA_MIDI_INPUT_QUERY = new InjectionToken("[WA_MIDI_INPUT_QUERY]");
function inputById(id) {
  return [{
    provide: WA_MIDI_INPUT_QUERY,
    useValue: id
  }, {
    provide: WA_MIDI_INPUT,
    deps: [WA_MIDI_ACCESS, WA_MIDI_INPUT_QUERY],
    useFactory: (midiAccess, id2) => __async(this, null, function* () {
      return midiAccess.then((access) => {
        let result;
        access.inputs.forEach((input) => {
          if (input.id === id2) {
            result = input;
          }
        });
        return result;
      });
    })
  }];
}
function inputByName(name) {
  return [{
    provide: WA_MIDI_INPUT_QUERY,
    useValue: name
  }, {
    provide: WA_MIDI_INPUT,
    deps: [WA_MIDI_ACCESS, WA_MIDI_INPUT_QUERY],
    useFactory: (midiAccess, name2) => __async(this, null, function* () {
      return midiAccess.then((access) => {
        let result;
        access.inputs.forEach((input) => {
          if (input.name === name2) {
            result = input;
          }
        });
        return result;
      });
    })
  }];
}
var WA_MIDI_OUTPUT_QUERY = new InjectionToken("[WA_MIDI_OUTPUT_QUERY]");
function outputById(id) {
  return [{
    provide: WA_MIDI_OUTPUT_QUERY,
    useValue: id
  }, {
    provide: WA_MIDI_OUTPUT,
    deps: [WA_MIDI_ACCESS, WA_MIDI_OUTPUT_QUERY],
    useFactory: (midiAccess, id2) => __async(this, null, function* () {
      return midiAccess.then((access) => {
        let result;
        access.outputs.forEach((output) => {
          if (output.id === id2) {
            result = output;
          }
        });
        return result;
      });
    })
  }];
}
function outputByName(name) {
  return [{
    provide: WA_MIDI_OUTPUT_QUERY,
    useValue: name
  }, {
    provide: WA_MIDI_OUTPUT,
    deps: [WA_MIDI_ACCESS, WA_MIDI_OUTPUT_QUERY],
    useFactory: (midiAccess, name2) => __async(this, null, function* () {
      return midiAccess.then((access) => {
        let result;
        access.outputs.forEach((output) => {
          if (output.name === name2) {
            result = output;
          }
        });
        return result;
      });
    })
  }];
}
var COEFFICIENT = 2 ** (1 / 12);
function toNote(frequency, tuning = 440) {
  return Math.round(Math.log(frequency / tuning) / Math.log(COEFFICIENT)) + 69;
}
export {
  FrequencyPipe,
  MIDI_ACCESS,
  MIDI_INPUT,
  MIDI_INPUTS,
  MIDI_MESSAGES,
  MIDI_OUTPUT,
  MIDI_OUTPUTS,
  MIDI_SUPPORT,
  SYSEX,
  WA_MIDI_ACCESS,
  WA_MIDI_INPUT,
  WA_MIDI_INPUTS,
  WA_MIDI_MESSAGES,
  WA_MIDI_OUTPUT,
  WA_MIDI_OUTPUTS,
  WA_MIDI_SUPPORT,
  WA_SYSEX,
  aftertouch,
  between,
  filterByChannel,
  filterById,
  filterByName,
  inputById,
  inputByName,
  mainVolume,
  modulationWheel,
  notes,
  outputById,
  outputByName,
  pan,
  pitchBend,
  polyphonicAftertouch,
  programChange,
  sustainPedal,
  toData,
  toDataByte,
  toFrequency,
  toNote,
  toStatusByte,
  toTimeStamp,
  toValueByte
};
//# sourceMappingURL=@ng-web-apis_midi.js.map
