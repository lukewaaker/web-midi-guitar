import { Component, Inject } from '@angular/core';
import { WA_MIDI_INPUT, WA_MIDI_OUTPUT, inputById, outputByName } from '@ng-web-apis/midi';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [inputById('input-0'), outputByName('VirtualMIDISynth')],
})
export class MainComponent {
  constructor(@Inject(WA_MIDI_INPUT) input: Promise<MIDIInput>, @Inject(WA_MIDI_OUTPUT) output: Promise<MIDIOutput>) { }
}
