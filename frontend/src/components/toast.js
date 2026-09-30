// Global Toast notification utility
export function showToast(message, type = 'success') {
  const toast = document.getElementById('global-toast');
  const label = document.getElementById('toast-message');
  const icon = document.getElementById('toast-icon');

  if (!toast || !label) {
    console.log(`[Toast ${type}]`, message);
    return;
  }

  label.textContent = message;

  if (icon) {
    if (type === 'error') {
      icon.textContent = 'error';
      icon.className = 'material-symbols-outlined text-[18px] text-red-400';
    } else if (type === 'info') {
      icon.textContent = 'info';
      icon.className = 'material-symbols-outlined text-[18px] text-blue-300';
    } else {
      icon.textContent = 'check_circle';
      icon.className = 'material-symbols-outlined text-[18px] text-emerald-300';
    }
  }

  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2400);
}
