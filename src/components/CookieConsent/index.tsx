"use client";

import { useEffect, useRef } from 'react';
import { klaroConfig } from './config';
import '@/styles/cookie-consent.css';

interface KlaroService {
  name: string;
  required?: boolean;
}

interface KlaroManager {
  show: (modal?: boolean) => void;
  hide: () => void;
  saveConsent?: (consent: Record<string, boolean>) => void;
  updateConsent?: (consent: Record<string, boolean>) => void;
}

interface KlaroModule {
  setup: (config: typeof klaroConfig) => void;
  getManager: (config: typeof klaroConfig) => KlaroManager;
}

export default function CookieConsent() {
  const klaroModuleRef = useRef<KlaroModule | null>(null);
  const klaroManagerRef = useRef<KlaroManager | null>(null);

  useEffect(() => {
    // Importa Klaro apenas no cliente (browser)
    const initKlaro = async () => {
      try {
        // Carrega CSS do Klaro dinamicamente
        if (typeof window !== 'undefined' && !document.querySelector('link[href*="klaro"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.jsdelivr.net/npm/klaro@0.7.22/dist/klaro.css';
          document.head.appendChild(link);
        }
        
        // Importa e inicializa o Klaro
        const Klaro = await import('klaro');
        klaroModuleRef.current = Klaro;
        
        Klaro.setup(klaroConfig);
        
        // Obtém a instância do manager do Klaro
        const manager = Klaro.getManager(klaroConfig);
        klaroManagerRef.current = manager;
        
        // Adiciona botão "Aceitar apenas essenciais" após o modal ser renderizado
        const addAcceptEssentialButton = () => {
          // Aguarda o modal ser renderizado
          setTimeout(() => {
            const modalFooter = document.querySelector('.cn-modal-footer');
            if (modalFooter && !document.querySelector('.cn-button-essential')) {
              // Cria o botão "Aceitar apenas essenciais"
              const essentialButton = document.createElement('button');
              essentialButton.className = 'cn-button cn-button-essential';
              essentialButton.textContent = 'Aceitar apenas essenciais';
              essentialButton.style.cssText = `
                padding: 10px 20px !important;
                border-radius: 8px !important;
                font-weight: 600 !important;
                font-size: 14px !important;
                transition: all 0.3s ease !important;
                border: 2px solid rgba(255, 255, 255, 0.3) !important;
                cursor: pointer !important;
                background: rgba(255, 255, 255, 0.15) !important;
                color: white !important;
                margin-right: auto !important;
              `;
              
              essentialButton.addEventListener('mouseenter', () => {
                essentialButton.style.background = 'rgba(255, 255, 255, 0.25) !important';
              });
              
              essentialButton.addEventListener('mouseleave', () => {
                essentialButton.style.background = 'rgba(255, 255, 255, 0.15) !important';
              });
              
              essentialButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Desativa todos os serviços opcionais
                const services = (klaroConfig.services || []) as KlaroService[];
                const consent: Record<string, boolean> = {};
                
                services.forEach((service: KlaroService) => {
                  // Aceita apenas serviços marcados como required: true
                  consent[service.name] = service.required === true;
                  
                  // Desativa o toggle no DOM se não for required
                  if (!service.required) {
                    const serviceElement = document.querySelector(`[data-name="${service.name}"]`);
                    if (serviceElement) {
                      const toggle = serviceElement.querySelector('.cn-service-toggle') as HTMLElement;
                      if (toggle && toggle.classList.contains('active')) {
                        toggle.click(); // Desativa o toggle
                      }
                    }
                  }
                });
                
                // Salva o consentimento usando o método correto do Klaro
                try {
                  // Usa o método saveConsent do manager
                  if (manager && manager.saveConsent) {
                    manager.saveConsent(consent);
                  } else if (manager && manager.updateConsent) {
                    manager.updateConsent(consent);
                  } else {
                    // Fallback: salva diretamente no cookie
                    const cookieName = 'klaro-consent';
                    const expires = new Date();
                    const expiresAfterDays = (klaroConfig.cookieExpiresAfterDays as number) || 365;
                    expires.setTime(expires.getTime() + (expiresAfterDays * 24 * 60 * 60 * 1000));
                    document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(consent))}; expires=${expires.toUTCString()}; path=/; domain=${klaroConfig.cookieDomain || window.location.hostname}`;
                    
                    // Recarrega a página para aplicar as mudanças
                    window.location.reload();
                    return;
                  }
                  
                  // Fecha o modal
                  if (manager && manager.hide) {
                    manager.hide();
                  }
                  
                  // Recarrega a página para aplicar as mudanças
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                } catch (error) {
                  console.error('Erro ao salvar consentimento:', error);
                }
              });
              
              // Insere o botão antes dos outros botões
              if (modalFooter.firstChild) {
                modalFooter.insertBefore(essentialButton, modalFooter.firstChild);
              } else {
                modalFooter.appendChild(essentialButton);
              }
            }
          }, 100);
        };
        
        // Adiciona botão "Aceitar apenas essenciais" no banner também
        const addAcceptEssentialToBanner = () => {
          setTimeout(() => {
            const bannerButtons = document.querySelector('.cn-container .cn-buttons');
            if (bannerButtons && !bannerButtons.querySelector('.cn-button-essential-banner')) {
              const essentialBannerButton = document.createElement('button');
              essentialBannerButton.className = 'cn-button cn-button-essential-banner';
              essentialBannerButton.textContent = 'Aceitar apenas essenciais';
              essentialBannerButton.style.cssText = `
                padding: 12px 24px !important;
                border-radius: 8px !important;
                font-weight: 600 !important;
                font-size: 14px !important;
                transition: all 0.3s ease !important;
                border: 2px solid rgba(255, 255, 255, 0.3) !important;
                cursor: pointer !important;
                background: rgba(255, 255, 255, 0.15) !important;
                color: white !important;
              `;
              
              essentialBannerButton.addEventListener('mouseenter', () => {
                essentialBannerButton.style.background = 'rgba(255, 255, 255, 0.25) !important';
              });
              
              essentialBannerButton.addEventListener('mouseleave', () => {
                essentialBannerButton.style.background = 'rgba(255, 255, 255, 0.15) !important';
              });
              
              essentialBannerButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                const services = (klaroConfig.services || []) as KlaroService[];
                const consent: Record<string, boolean> = {};
                
                services.forEach((service: KlaroService) => {
                  consent[service.name] = service.required === true;
                });
                
                // Salva o consentimento
                try {
                  const cookieName = 'klaro-consent';
                  const expires = new Date();
                  const expiresAfterDays = (klaroConfig.cookieExpiresAfterDays as number) || 365;
                  expires.setTime(expires.getTime() + (expiresAfterDays * 24 * 60 * 60 * 1000));
                  document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(consent))}; expires=${expires.toUTCString()}; path=/; domain=${klaroConfig.cookieDomain || window.location.hostname}`;
                  
                  // Recarrega a página
                  window.location.reload();
                } catch (error) {
                  console.error('Erro ao salvar consentimento:', error);
                }
              });
              
              // Insere o botão antes do botão "Aceitar todos"
              const acceptAllButton = bannerButtons.querySelector('.cn-button-accept');
              if (acceptAllButton) {
                bannerButtons.insertBefore(essentialBannerButton, acceptAllButton);
              } else {
                bannerButtons.appendChild(essentialBannerButton);
              }
            }
          }, 100);
        };
        
        // Observa quando o modal ou banner é renderizado para adicionar os botões
        const observer = new MutationObserver(() => {
          if (document.querySelector('.cn-modal')) {
            addAcceptEssentialButton();
          }
          if (document.querySelector('.cn-container')) {
            addAcceptEssentialToBanner();
          }
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        
        // Expõe funções úteis globalmente para debug/teste
        if (typeof window !== 'undefined') {
          // Armazena o módulo e config no window para acesso global
          (window as Window & { 
            __klaroModule?: KlaroModule;
            __klaroConfig?: typeof klaroConfig;
            __klaroManager?: KlaroManager;
            __getKlaroManager?: () => KlaroManager | null;
            showCookieBanner?: () => void;
            showCookieModal?: () => void;
            clearCookieConsent?: () => void;
            checkCookieConsent?: () => Record<string, boolean> | null;
            openCookieModal?: () => void;
          }).__klaroModule = Klaro;
          (window as Window & { __klaroConfig?: typeof klaroConfig }).__klaroConfig = klaroConfig;
          (window as Window & { __klaroManager?: KlaroManager }).__klaroManager = manager;
          
          // Função auxiliar para obter o manager (acessível globalmente)
          (window as Window & { __getKlaroManager?: () => KlaroManager | null }).__getKlaroManager = () => {
            const w = window as Window & { 
              __klaroManager?: KlaroManager;
              __klaroModule?: KlaroModule;
              __klaroConfig?: typeof klaroConfig;
            };
            if (w.__klaroManager) {
              return w.__klaroManager;
            }
            if (w.__klaroModule && w.__klaroConfig) {
              const manager = w.__klaroModule.getManager(w.__klaroConfig);
              w.__klaroManager = manager;
              return manager;
            }
            return null;
          };
          
          // Função para mostrar o banner novamente
          (window as Window & { showCookieBanner?: () => void }).showCookieBanner = () => {
            const w = window as Window & { __getKlaroManager?: () => KlaroManager | null };
            const manager = w.__getKlaroManager?.();
            if (manager?.show) {
              manager.show();
              console.log('✅ Banner de cookies aberto!');
            } else {
              console.warn('⚠️ Klaro ainda não foi carregado. Aguarde alguns segundos.');
            }
          };
          
          // Função para abrir o modal de configuração
          (window as Window & { showCookieModal?: () => void }).showCookieModal = () => {
            const w = window as Window & { __getKlaroManager?: () => KlaroManager | null };
            const manager = w.__getKlaroManager?.();
            if (manager?.show) {
              manager.show(true); // true = abre como modal
              console.log('✅ Modal de cookies aberto!');
            } else {
              console.warn('⚠️ Klaro ainda não foi carregado. Aguarde alguns segundos.');
            }
          };
          
          // Função para limpar o consentimento (útil para testes)
          (window as Window & { clearCookieConsent?: () => void }).clearCookieConsent = () => {
            const cookieName = 'klaro-consent';
            const domain = window.location.hostname;
            // Remove o cookie
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            console.log('✅ Consentimento de cookies removido! Recarregue a página para ver o banner novamente.');
          };
          
          // Função para ver o estado atual do consentimento
          (window as Window & { checkCookieConsent?: () => Record<string, boolean> | null }).checkCookieConsent = () => {
            const consentCookie = document.cookie
              .split('; ')
              .find(row => row.startsWith('klaro-consent='));
            
            if (consentCookie) {
              try {
                const cookieValue = consentCookie.split('=')[1];
                const consent = JSON.parse(decodeURIComponent(cookieValue)) as Record<string, boolean>;
                console.log('📋 Estado atual do consentimento:', consent);
                return consent;
              } catch (e) {
                console.error('❌ Erro ao ler consentimento:', e);
                return null;
              }
            } else {
              console.log('📋 Nenhum consentimento salvo ainda.');
              return null;
            }
          };
          
          // Função global para abrir modal (usada pelo footer)
          (window as Window & { openCookieModal?: () => void }).openCookieModal = () => {
            const w = window as Window & { __getKlaroManager?: () => KlaroManager | null };
            const manager = w.__getKlaroManager?.();
            if (manager?.show) {
              manager.show(true); // true = modal
            } else {
              // Se ainda não carregou, tenta novamente após um delay
              setTimeout(() => {
                const retryManager = w.__getKlaroManager?.();
                if (retryManager?.show) {
                  retryManager.show(true);
                }
              }, 500);
            }
          };
          
          console.log('🍪 Funções de gerenciamento de cookies disponíveis:');
          console.log('  - showCookieBanner() - Mostra o banner novamente');
          console.log('  - showCookieModal() - Abre o modal de configuração');
          console.log('  - clearCookieConsent() - Remove o consentimento (útil para testes)');
          console.log('  - checkCookieConsent() - Mostra o estado atual do consentimento');
        }
        
        // O Klaro gerencia automaticamente a exibição do banner
        // Se mustConsent: true, ele mostra automaticamente se não houver consentimento
        // Não precisamos chamar show() manualmente
      } catch (error) {
        console.error('Erro ao inicializar Klaro:', error);
      }
    };

    initKlaro();
  }, []);

  return null;
}

