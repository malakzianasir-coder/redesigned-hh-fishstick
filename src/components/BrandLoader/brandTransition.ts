type Listener = () => void;

class BrandTransitionManager {
  private listeners: Set<Listener> = new Set();
  private isTransitioning = false;

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public showTransition() {
    this.isTransitioning = true;
    this.notify();
  }

  public done() {
    this.isTransitioning = false;
    this.notify();
  }

  public getIsTransitioning() {
    return this.isTransitioning;
  }
}

export const brandTransition = new BrandTransitionManager();
