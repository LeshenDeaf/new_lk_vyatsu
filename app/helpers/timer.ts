export class Timer {
	timerId?: number | null;
	startTime?: number;
	remaining?: number;
	callback;
  status: 'paused' | 'started' | 'stopped' | 'ticking' = 'stopped';

	constructor(callback: CallableFunction) {
		this.callback = callback;
	}

	pause() {
		if (!this.timerId || !this.start) {
			return;
		}

    this.status = 'paused';

		window.clearTimeout(this.timerId);
		this.timerId = null;

		if (this.remaining) {
			this.remaining -= Date.now() - (this.startTime ?? 0);
		}
	}

	resume() {
		if (this.timerId) {
			return;
		}

    this.status = 'ticking';

		this.startTime = Date.now();
		this.timerId = window.setTimeout(this.callback, this.remaining);
	}

	start(delay: number) {
    if (this.timerId) {
      return;
    }
    this.status = 'started';

		this.remaining = delay;
		this.resume();
	}

  restart(delay: number) {
    this.stop();
    this.start(delay);
  }

  stop() {
    if (this.timerId){
      this.status = 'stopped';

      window.clearTimeout(this.timerId);
      this.timerId = undefined;
      this.startTime = undefined;
      this.remaining = undefined;
    }
  }
}
