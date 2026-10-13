export type FeedbackType = 'success' | 'fail' | 'reaction';

function restartClass(element: HTMLElement, className: string): void {
  element.classList.remove(className);
  element.getBoundingClientRect();
  element.classList.add(className);
}

export function playFeedback(
  cauldron: HTMLElement,
  frame: HTMLElement,
  floatText: HTMLElement,
  type: FeedbackType,
  text: string,
): void {
  cauldron.classList.remove('cauldron--success', 'cauldron--fail', 'cauldron--reaction');
  restartClass(cauldron, `cauldron--${type}`);

  floatText.textContent = text;
  floatText.className = 'cauldron__float-text';
  restartClass(floatText, `cauldron__float-text--${type}`);

  if (type === 'fail') {
    restartClass(frame, 'frame--shake');
  }
}
