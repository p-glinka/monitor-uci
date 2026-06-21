// 🧠 CAPA DE CONFIGURACIÓN CLÍNICA CENTRALIZADA (Evidencia UCI)
export const CONFIG_CLINICA = {
    gcs: {
        UMBRAL_CRITICO: 8,
        UMBRAL_MODERADO: 12,
        VALORES_BASE: { o: 4, v: 5, m: 6 }
    },
    rass: {
        UMBRAL_ALERTA_POSITIVO: 1,  // Agitación / Peligro
        UMBRAL_ALERTA_NEGATIVO: -3, // Sedación profunda
        VALOR_BASE: 0
    },
    braden: {
        RIESGO_ALTO: 12,
        RIESGO_MODERADO: 14,
        RIESGO_BAJO: 18,
        VALORES_BASE: { s: 4, h: 4, a: 4, m: 4, n: 4, r: 3 }
    },
    irox: {
        CORTE_FRACASO_CNAF: 4.88,
        RANGOS: {
            SPO2: { MIN: 50, MAX: 100 },
            FIO2: { MIN: 0.21, MAX: 1.0 },
            FR: { MIN: 5, MAX: 70 }
        }
    }
};