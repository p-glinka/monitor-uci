// js/farmacos.js - Vademécum Completo PROA Hospital Argerich (Versión 1.0)

export let vademecumHospital = [
    {
        id: "aciclovir",
        nombre: "Aciclovir",
        presentacion: "500 mg F/A",
        reconstitucion: "10 mL de API (Cc: 50 mg/mL)",
        dilucion: "500 mg en 100 mL (Cc máx: 7 mg/mL)",
        solventes: "SF, DX5%, RL",
        via: "IV lenta en 1 hora. No recomendada: IV continua, IM, SC, bolo.",
        estabilidad: "R: 12 hs a T° Amb (no refrigerar porque precipita). D: 24 hs a T° Amb.",
        observaciones: "Asegurar hidratación adecuada. Soluciones de más de 10 mg/mL pueden producir flebitis e inflamación.",
        semaforo: {
            prohibido: "PROHIBIDO bolo, IM, SC, IV continua. NO REFRIGERAR la reconstitución (precipita).",
            precaucion: "Soluciones mayores a 10 mg/mL aumentan significativamente el riesgo de flebitis. Asegurar hidratación del paciente.",
            seguro: "Administrar por vía IV lenta exactamente en 1 hora con dilución adecuada."
        }
    },
    {
        id: "amikacina",
        nombre: "Amikacina",
        presentacion: "500 mg / 2 mL solución inyectable",
        reconstitucion: "No corresponde",
        dilucion: "500 mg en 100-200 mL (Cc máx: 5 mg/mL)",
        solventes: "DX5%, SF, RL",
        via: "IV lenta 30-60 min o IM (sin diluir). No recomendada: IV continua, SC, bolo.",
        estabilidad: "Utilizar inmediatamente tras dilución.",
        observaciones: "El cambio de color de la solución no implica pérdida de la actividad.",
        semaforo: {
            prohibido: "PROHIBIDO bolo, SC o IV continua.",
            precaucion: "Si se administra por vía IM, se debe aplicar sin diluir. Controlar función renal y ototoxicidad.",
            seguro: "Vía IM directa o infusión IV lenta en un lapso de 30 a 60 minutos."
        }
    },
    {
        id: "ampicilina",
        nombre: "Ampicilina",
        presentacion: "1000 mg F/A",
        reconstitucion: "10 mL de API. IM: 1000 mg en 5 mL de API.",
        dilucion: "1000 mg en 100 mL (Cc máx: 30 mg/mL)",
        solventes: "SF (de elección). Menor estabilidad en DX5% (se hidroliza).",
        via: "Bolo: 5-15 min (No exceder 100 mg/min). IV lenta: 15-60 min. IM. No: SC, IV continua.",
        estabilidad: "R: 60 min a T° Amb / 4 hs en heladera. D (en SF): 8 hs a T° Amb / 24 hs en heladera. Administrar inmediatamente.",
        observaciones: "Vía IV muy rápida puede producir convulsiones. Incompatible con gluconato de calcio.",
        semaforo: {
            prohibido: "Incompatible con Gluconato de Calcio. Evitar dilución en DX5% por hidrólisis del fármaco. No usar SC o IV continua.",
            precaucion: "La administración IV muy rápida puede gatillar convulsiones. No exceder 100 mg/min en bolo.",
            seguro: "Dilución en Solución Fisiológica e infusión lenta en 15 a 60 minutos o administración inmediata."
        }
    },
    {
        id: "ampicilina_sulbactam",
        nombre: "Ampicilina-Sulbactam (AMS)",
        presentacion: "1.5 gr F/A (1 gr ampicilina / 0.5 gr sulbactam)",
        reconstitucion: "10 mL de API.",
        dilucion: "1500 mg en 100 mL (Cc máx: 30 mg/mL)",
        solventes: "SF (de elección). Menor estabilidad en DX5% (se hidroliza).",
        via: "Bolo: 5-15 min. IV lenta: 15-30 min. IM. No recomendada: SC, IV continua.",
        estabilidad: "R: 60 min a T° Amb / 4 hs en heladera. D (en SF): 8 hs a T° Amb / 24 hs en heladera. Administrar inmediatamente.",
        observaciones: "Vía IV muy rápida puede producir convulsiones. Dilución en DX5% produce hidrólisis.",
        semaforo: {
            prohibido: "Evitar dilución en DX5% por hidrólisis de la droga. Prohibida vía SC o IV continua.",
            precaucion: "La administración rápida puede generar convulsiones. Respetar los tiempos de goteo.",
            seguro: "Administración por vía IV lenta en 15-30 minutos diluido en SF."
        }
    },
    {
        id: "anfotericina_complejo_lipidico",
        nombre: "Anfotericina Complejo Lipídico",
        presentacion: "100 mg F/A",
        reconstitucion: "No corresponde",
        dilucion: "100 mg en 100 mL (Cc máx: 2 mg/mL)",
        solventes: "ÚNICAMENTE DX5% (Incompatible con SF, precipita)",
        via: "IV lenta 2-4 hs. No recomendada: Bolo.",
        estabilidad: "R: mantener en heladera. D: 6 hs a T° Amb / 24 hs en heladera. Conservar en heladera.",
        observaciones: "INCOMPATIBLE CON SF (PRECIPITA). Incompatible con cualquier electrolito. Requiere prehidratación con 500 mL de SF y balance hídrico.",
        semaforo: {
            prohibido: "PROHIBIDO DILUIR EN SOLUCIÓN FISIOLÓGICA O MEZCLAR CON ELECTROLYTOS (PRECIPITA). Prohibido en bolo.",
            precaucion: "Requiere protocolo estricto de prehidratación con 500 mL de SF antes de infundir y control estricto de balance hídrico.",
            seguro: "Infusión IV lenta de 2 a 4 horas exclusivamente en sachet de Dextrosa al 5%."
        }
    },
    {
        id: "anfotericina_b_deoxicolato",
        nombre: "Anfotericina B Deoxicolato",
        presentacion: "50 mg F/A",
        reconstitucion: "10 mL de API",
        dilucion: "50 mg en 500 mL (Cc máx: 0.1 mg/mL)",
        solventes: "ÚNICAMENTE DX5%",
        via: "IV lenta 3-6 hs. No recomendada: Bolo, IM, SC.",
        estabilidad: "R: 24 hs a T° Amb y en heladera. D: 24 hs a T° Amb y en heladera. Es necesario proteger de la luz la administración.",
        observaciones: "Si presenta reacciones durante la infusión: premedicación con paracetamol, difenhidramina y/o hidrocortisona. Escalofríos/temblores: meperidina (25-50mg).",
        semaforo: {
            prohibido: "PROHIBIDO DILUIR EN SOLUCIÓN FISIOLÓGICA (PRECIPITA). Prohibido en bolo, IM o SC.",
            precaucion: "Proteger de la luz durante la administración. Monitorear reacciones adversas; premedicar si hay escalofríos con meperidina.",
            seguro: "Goteo IV ultralento de 3 a 6 horas diluido únicamente en Dextrosa al 5%."
        }
    },
    {
        id: "anfotericina_liposomal",
        nombre: "Anfotericina Liposomal",
        presentacion: "50 mg F/A",
        reconstitucion: "12 mL de API.",
        dilucion: "50-100 mg en 100 mL (Cc máx: 2 mg/mL)",
        solventes: "ÚNICAMENTE DX5%",
        via: "IV lenta 30-120 min. No recomendada: IV continua, bolo, IM, SC.",
        estabilidad: "R: 24 hs a T° Amb y en heladera. D: 24 hs a T° Amb y en heladera.",
        observaciones: "Presenta mejor tolerancia y menor nefrotoxicidad que las otras formulaciones, pero requiere goteo controlado.",
        semaforo: {
            prohibido: "PROHIBIDO DILUIR EN SOLUCIÓN FISIOLÓGICA. Contraindicado en bolo, IM, SC o infusión continua.",
            precaucion: "Asegurar que la reconstitución sea con API antes de diluir únicamente en DX5%.",
            seguro: "Infusión IV controlada en un periodo de 30 a 120 minutos."
        }
    },
    {
        id: "anidulafungina",
        nombre: "Anidulafungina",
        presentacion: "100 mg F/A",
        reconstitucion: "30 mL de API",
        dilucion: "100 mg en 100 mL",
        solventes: "SF, DX5%",
        via: "IV lenta: 100 mg en 90 min. No recomendada: bolo, IM, IV continua, SC.",
        estabilidad: "R: 60 min en heladera. D: 24 hs en heladera.",
        observaciones: "Dosis de carga: 200 mg en 200 mL de SF y administrar en un lapso de 3 hs.",
        semaforo: {
            prohibido: "PROHIBIDO bolo, IM, SC o infusión continua.",
            precaucion: "La dosis de carga (200 mg) requiere un volumen de 200 mL y debe pasar lentamente en 3 horas.",
            seguro: "Dosis de mantenimiento (100 mg) por goteo IV lento de 90 minutos."
        }
    },
    {
        id: "aztreonam",
        nombre: "Aztreonam",
        presentacion: "1000 mg F/A",
        reconstitucion: "5 mL de API. IM: 3 mL de API.",
        dilucion: "1000 mg en 100 mL (Cc máx: 20 mg/mL)",
        solventes: "SF, DX5%",
        via: "IV lenta 30-60 min o IM. No recomendada: bolo, IV continua, SC.",
        estabilidad: "R y D: 24 hs a T° Amb y en heladera.",
        observaciones: "Al reconstituirlo puede pasar de incoloro a rosado (no significa pérdida de actividad). Coadministración con Ceftazidima+Avibactam: infundir simultáneamente (no en la misma bolsa) en 3 hs.",
        semaforo: {
            prohibido: "No administrar en bolo, SC o infusión continua.",
            precaucion: "Si se coadministra con Ceftazidima+Avibactam, infundir al mismo tiempo en vías separadas (Y) durante 3 horas.",
            seguro: "Infusión IV lenta de 30 a 60 minutos o vía IM directa."
        }
    },
    {
        id: "cefazolina",
        nombre: "Cefazolina",
        presentacion: "1000 mg F/A",
        reconstitucion: "10 mL de API. IM: 3 mL de API.",
        dilucion: "1000 mg en 100 mL (Cc máx: 100 mg/mL)",
        solventes: "SF, DX5%",
        via: "IV lenta 30-60 min, IM o Bolo en 3-5 min. No recomendada: SC, IV continua.",
        estabilidad: "R y D: 24 hs a T° Amb y en heladera.",
        observaciones: "Excelente estabilidad. Utilizado comúnmente para profilaxis quirúrgica.",
        semaforo: {
            prohibido: "PROHIBIDA la vía SC o la infusión continua.",
            precaucion: "Si se administra en bolo, debe realizarse lentamente en un lapso de 3 a 5 minutos.",
            seguro: "Infusión IV lenta en 30-60 minutos o inyección intramuscular profunda."
        }
    },
    {
        id: "cefepime",
        nombre: "Cefepime",
        presentacion: "1000 o 2000 mg F/A",
        reconstitucion: "IV: 10 mL de API, SF o DX5%. IM: 3-4 mL de API o lidocaína al 0.5 - 1%.",
        dilucion: "1000 mg en 100 mL (Cc máx: 40 mg/mL)",
        solventes: "SF, DX5%",
        via: "IV lenta 30-60 min, IM o Bolo en 3-5 min. No recomendada: IV continua.",
        estabilidad: "R y D: 24 hs a T° Amb y en heladera.",
        observaciones: "En administración IM, aplicar un máximo de 1 gr en el mismo sitio de inyección.",
        semaforo: {
            prohibido: "No recomendada la infusión IV continua.",
            precaucion: "La vía intramuscular está limitada a un máximo de 1 gramo por sitio de punción para evitar dolor/lesión muscular.",
            seguro: "Goteo IV lento de 30 a 60 minutos o bolo lento de 3 a 5 minutos."
        }
    },
    {
        id: "ceftazidima",
        nombre: "Ceftazidima",
        presentacion: "1000 mg F/A",
        reconstitucion: "10 mL de API. IM: 1000 mg en 3 mL de API o lidocaína al 1%.",
        dilucion: "1000 mg en 100 mL (Cc máx: 40 mg/mL)",
        solventes: "SF, DX5%",
        via: "IV lenta 15-60 min, IM o Bolo en 3-5 min. No recomendada: IV continua.",
        estabilidad: "R: 18 hs a T° Amb / 24 hs en heladera. D: 24 hs a T° Amb y en heladera.",
        observaciones: "La administración rápida puede producir tromboflebitis.",
        semaforo: {
            prohibido: "No recomendada la infusión IV continua.",
            precaucion: "Evitar inyecciones IV excesivamente rápidas para prevenir tromboflebitis local.",
            seguro: "Administración por vía IV lenta en un periodo de 15 a 60 minutos."
        }
    },
    {
        id: "ceftazidima_avibactam",
        nombre: "Ceftazidima-Avibactam",
        presentacion: "2.5 gr F/A (2 gr ceftazidima / 0.5 gr avibactam)",
        reconstitucion: "10 mL de API, SF o DX5%",
        dilucion: "2.5 gr en 100 mL (Cc máx: 40 mg/mL)",
        solventes: "SF, DX5%, RL",
        via: "IV lenta: 120 min. No recomendada: IM, bolo, IV continua.",
        estabilidad: "R y D: 12 hs a T° Amb / 24 hs en heladera.",
        observaciones: "En caso de administrar junto a Aztreonam, infundir simultáneamente (no en la misma bolsa) en un lapso de 3 hs.",
        semaforo: {
            prohibido: "PROHIBIDO bolo, IM o infusión continua.",
            precaucion: "La estabilidad a T° Ambiente es más reducida (12 horas). Si se asocia a Aztreonam, coordinar infusión simultánea en Y durante 3 horas.",
            seguro: "Infusión endovenosa mandatoria programada para pasar en 120 minutos (2 horas)."
        }
    },
    {
        id: "ceftriaxona",
        nombre: "Ceftriaxona",
        presentacion: "1000 mg F/A",
        reconstitucion: "10 mL de API. IM: 3 mL de lidocaína al 1%.",
        dilucion: "1000 mg en 100 mL (Cc máx: 40 mg/mL)",
        solventes: "SF, DX5% (Incompatible con soluciones que contengan calcio como RL)",
        via: "IV lenta: 30 min. IM: 2-4 min. Bolo: 3-5 min. No recomendada: IV continua.",
        estabilidad: "R y D: 6 hs a T° Amb / 24 hs en heladera.",
        observaciones: "INCOMPATIBLE CON SOLUCIONES QUE CONTENGAN CALCIO (como Ringer Lactato). IM: hasta 1 gr en el mismo sitio.",
        semaforo: {
            prohibido: "PROHIBIDO DILUIR O MEZCLAR CON RINGER LACTATO O SOLUCIONES CON CALCIO (riesgo de precipitación pulmonar/renal). No usar IV continua.",
            precaucion: "Estabilidad muy corta a temperatura ambiente (solo 6 horas). Máximo 1 gr por sitio de inyección IM.",
            seguro: "Diluido en SF o DX5% a pasar en 30 minutos por vía IV lenta."
        }
    },
    {
        id: "ciprofloxacina",
        nombre: "Ciprofloxacina",
        presentacion: "200 mg / 100 mL sachet",
        reconstitucion: "No corresponde",
        dilucion: "No corresponde (Listo para usar)",
        solventes: "No corresponde",
        via: "IV lenta: 200 mg en 30 min.",
        estabilidad: "No corresponde (Sachet cerrado de fábrica).",
        observaciones: "Proteger de la luz. Viene listo para conectar e infundir.",
        semaforo: {
            prohibido: "No transvasar ni diluir. Prohibido bolo rápido.",
            precaucion: "Proteger de la luz ambiental directa durante el almacenamiento y la infusión.",
            seguro: "Conexión directa del sachet e infusión lenta en 30 minutos."
        }
    },
    {
        id: "claritromicina",
        nombre: "Claritromicina",
        presentacion: "500 mg F/A",
        reconstitucion: "10 mL de API",
        dilucion: "500 mg en 500 mL (Cc máx: 2 mg/mL)",
        solventes: "SF, DX5%",
        via: "IV lenta: 60 min. No recomendado: IM, bolo, IV continua.",
        estabilidad: "R: 24 hs a T° Amb y en heladera. D: 6 hs a T° Amb y en heladera.",
        observaciones: "Administrar en vena de gran calibre para minimizar el dolor durante la infusión.",
        semaforo: {
            prohibido: "PROHIBIDO bolo, IM o IV continua.",
            precaucion: "Altamente irritante. Infundir en venas de gran calibre o vía central para evitar dolor extremo y flebitis química. Estabilidad de dilución corta (6 hs).",
            seguro: "Infusión diluida en un sachet grande de 500 mL a pasar lento en 60 minutos."
        }
    },
    {
        id: "clindamicina",
        nombre: "Clindamicina",
        presentacion: "600 mg / 4 mL solución inyectable",
        reconstitucion: "No corresponde",
        dilucion: "600 mg en 100 mL (Cc máx: 12 mg/mL)",
        solventes: "SF, DX5%",
        via: "IV lenta: 30 min. IM: 2-4 min. No recomendada: bolo, IV continua.",
        estabilidad: "D: 24 hs a T° Amb y en heladera.",
        observaciones: "IM: administrar hasta un máximo de 600 mg por dosis.",
        semaforo: {
            prohibido: "PROHIBIDO bolo directo (riesgo de paro cardiorrespiratorio por hipotensión brusca).",
            precaucion: "Vía intramuscular limitada a 600 mg por sitio de punción para evitar daño tisular.",
            seguro: "Infusión IV lenta diluida a pasar en 30 minutos."
        }
    },
    {
        id: "colistin",
        nombre: "Colistin",
        presentacion: "100 mg F/A",
        reconstitucion: "10 mL de API",
        dilucion: "100 mg en 100 mL (Cc máx: 50 mg/mL)",
        solventes: "SF, DX5%, RL",
        via: "IV lenta: 30 min. Bolo: diluir en 10 mL y pasar en 3-10 min. No recomendada: IM, IV continua.",
        estabilidad: "R: 24 hs a T° Amb y en heladera. D: 8 hs a T° Amb / 24 hs en heladera.",
        observaciones: "IV lenta: administrar en menos de 60 minutos para evitar la hidrólisis espontánea de la droga activa.",
        semaforo: {
            prohibido: "No recomendado por vía IM o infusión IV continua.",
            precaucion: "Para la infusión IV lenta, gotee exactamente en 30 minutos (no exceder los 60 min para evitar que el fármaco se inactive por hidrólisis).",
            seguro: "Infusión controlada de 30 minutos o bolo diluido lento administrado de 3 a 10 minutos."
        }
    },
    {
        id: "daptomicina",
        nombre: "Daptomicina",
        presentacion: "500 mg F/A",
        reconstitucion: "10 mL de SF",
        dilucion: "500 mg en 100 mL (Cc máx: 20 mg/mL)",
        solventes: "ÚNICAMENTE SF (Incompatible con DX5%)",
        via: "IV lenta: 30 min. No recomendada: Bolo, IM, IV continua.",
        estabilidad: "R y D: 12 hs a T° Amb / 24 hs en heladera.",
        observaciones: "INCOMPATIBLE CON SOLUCIONES DE DX5%. Las soluciones reconstituidas varían en color desde el amarillo pálido al marrón claro.",
        semaforo: {
            prohibido: "PROHIBIDO DILUIR EN DEXTROSA AL 5%. Prohibido bolo, IM o IV continua.",
            precaucion: "Reconstituir solo con SF (no con API). El color de la solución puede variar sin afectar su potencia.",
            seguro: "Administrar exclusivamente diluido en SF por goteo lento en 30 minutos."
        }
    },
    {
        id: "ertapenem",
        nombre: "Ertapenem",
        presentacion: "1000 mg F/A",
        reconstitucion: "10 mL de API o SF. IM: 3 mL de lidocaína al 1%.",
        dilucion: "1000 mg en 100 mL (Cc máx: 20 mg/mL)",
        solventes: "ÚNICAMENTE SF (Incompatible con DX5%)",
        via: "IV lenta: 30-60 min. IM: 2-4 min. No recomendada: bolo, SC, IV continua.",
        estabilidad: "R: utilizar inmediatamente. D: 6 hs a T° Amb / 24 hs en heladera.",
        observaciones: "INCOMPATIBLE CON DX5%. Una vez reconstituido se debe diluir inmediatamente.",
        semaforo: {
            prohibido: "PROHIBIDO DILUIR EN DEXTROSA AL 5%. No administrar por vía SC, bolo o IV continua.",
            precaucion: "La solución reconstituida no se puede almacenar; se debe diluir de forma inmediata.",
            seguro: "Infusión IV diluida en SF a pasar en 30-60 minutos."
        }
    },
    {
        id: "estreptomicina",
        nombre: "Estreptomicina",
        presentacion: "1000 mg F/A",
        reconstitucion: "IM: 2-4 mL de API",
        dilucion: "1000 mg en 100 mL",
        solventes: "SF",
        via: "IM (Vía de elección). *IV lenta: excepcional, no recomendada* (pasar en 30-60 min). No recomendada: bolo, SC, IV continua.",
        estabilidad: "R: 24 hs a T° Amb y en heladera. D: usar inmediatamente.",
        observaciones: "Usar la vía IV exclusivamente cuando la vía IM no sea viable. IM: rotar sitios de inyección.",
        semaforo: {
            prohibido: "Prohibido administrar en bolo, SC o infusión continua.",
            precaucion: "La vía IV lenta es excepcional y no recomendada habitualmente; de usarse, infundir en 30-60 minutos de forma controlada.",
            seguro: "Administración por vía Intramuscular profunda (rotar los sitios de inyección)."
        }
    },
    {
        id: "fluconazol",
        nombre: "Fluconazol",
        presentacion: "200 mg / 100 mL sachet",
        reconstitucion: "No corresponde",
        dilucion: "No corresponde (Listo para usar)",
        solventes: "No corresponde",
        via: "IV lenta: 30-60 min. No recomendada: bolo, IM, SC.",
        estabilidad: "No corresponde.",
        observaciones: "Proteger de la luz. Viene listo para colgar e infundir.",
        semaforo: {
            prohibido: "PROHIBIDO en bolo, inyección IM o subcutánea.",
            precaucion: "Proteger el sachet de la luz ambiental. Ajustar según velocidad tolerada.",
            seguro: "Goteo IV lento del sachet directo en un lapso de 30 a 60 minutos."
        }
    },
    {
        id: "fosfomicina",
        nombre: "Fosfomicina",
        presentacion: "1000 mg F/A",
        reconstitucion: "10 mL de API o DX5%",
        dilucion: "1000 mg en 100 mL (Cc máx: 20 mg/mL)",
        solventes: "DX5% (de elección), SF, RL",
        via: "IV lenta: 1 gr en 60 min. No recomendada: bolo, IV continua, SC, IM.",
        estabilidad: "R y D: 24 hs en DX5% o SF.",
        observaciones: "Cada vial aporta un alto contenido de sodio: 14.5 mEq (330 mg).",
        semaforo: {
            prohibido: "No recomendada vía bolo, IV continua, IM o subcutánea.",
            precaucion: "Vigilar estrictamente a pacientes con insuficiencia cardíaca o sobrecarga de volumen por su altísimo contenido de sodio (330 mg por gramo).",
            seguro: "Goteo lento de 1 gramo diluido (de elección en DX5%) a pasar en 60 minutos."
        }
    },
    {
        id: "ganciclovir",
        nombre: "Ganciclovir",
        presentacion: "500 mg F/A",
        reconstitucion: "10 mL de API",
        dilucion: "500 mg en 100 mL (Cc máx: 10 mg/mL)",
        solventes: "DX5%, SF, RL",
        via: "IV lenta: 60 min. No recomendada: IM, IV continua, bolo, SC.",
        estabilidad: "R: 12 hs a T° Amb (NO refrigerar). D: 24 hs a T° Amb y en heladera.",
        observaciones: "Infundir en vena de gran calibre o vía central. Altamente alcalino (pH ~11), riesgo severo de flebitis y necrosis por extravasación.",
        semaforo: {
            prohibido: "PROHIBIDO bolo, IM, SC o infusión continua. NO guardar la reconstitución en la heladera (precipita).",
            precaucion: "Debido a su pH extremo (~11), requiere obligatoriamente vías de gran calibre o preferentemente vía central para prevenir flebitis química.",
            seguro: "Infusión IV lenta estricta de 60 minutos de duración."
        }
    },
    {
        id: "gentamicina",
        nombre: "Gentamicina",
        presentacion: "80 mg / 2 mL solución inyectable",
        reconstitucion: "No corresponde",
        dilucion: "80 mg en 100 mL (Cc máx: 1 mg/mL)",
        solventes: "DX5%, SF, RL",
        via: "IV lenta: 30-120 min o IM. No recomendada: bolo, IV continua, SC.",
        estabilidad: "D: 24 hs a T° Amb y en heladera.",
        observaciones: "Monitorear niveles terapéuticos, ototoxicidad y función renal.",
        semaforo: {
            prohibido: "PROHIBIDO bolo directo, SC o infusión continua.",
            precaucion: "Evitar concentraciones mayores a 1 mg/mL en perfusión. Monitorear estrechamente la diuresis.",
            seguro: "Aplicación intramuscular directa o infusión IV lenta programada de 30 a 120 minutos."
        }
    },
    {
        id: "imipenem_cilastatina",
        nombre: "Imipenem-Cilastatina",
        presentacion: "500/500 mg F/A",
        reconstitucion: "10 mL de SF",
        dilucion: "500 mg en 100 mL (Cc máx: 5 mg/mL)",
        solventes: "DX5%, SF",
        via: "IV lenta: 20-30 min. No recomendada: bolo, IV continua, SC, IM.",
        estabilidad: "R y D: 4 hs a T° Amb / 24 hs en heladera.",
        observaciones: "Dosis mayores a 500 mg deben infundirse en 40-60 min. Si aparecen náuseas o vómitos durante la infusión, reducir velocidad.",
        semaforo: {
            prohibido: "Prohibido bolo, IV continua, IM o subcutánea.",
            precaucion: "Si el paciente experimenta náuseas, arcadas o vómitos durante el goteo, se debe disminuir de inmediato la velocidad de infusión.",
            seguro: "Goteo IV lento estándar de 20 a 30 minutos (para dosis de 500 mg)."
        }
    },
    {
        id: "linezolid",
        nombre: "Linezolid",
        presentacion: "600 mg / 300 mL sachet",
        reconstitucion: "No corresponde",
        dilucion: "No corresponde (Listo para usar)",
        solventes: "No corresponde",
        via: "IV lenta: 60 min. No recomendado: bolo, infusión continua, IM.",
        estabilidad: "No corresponde.",
        observaciones: "Proteger de la luz ambiental.",
        semaforo: {
            prohibido: "PROHIBIDO bolo directo, infusión continua o vía IM.",
            precaucion: "Proteger el sachet de la exposición solar directa o luz intensa durante el goteo.",
            seguro: "Conexión directa e infusión lenta controlada por bomba en exactamente 60 minutos."
        }
    },
    {
        id: "meropenem",
        nombre: "Meropenem",
        presentacion: "1000 mg F/A",
        reconstitucion: "20 mL de API",
        dilucion: "1000 mg en 100 mL (Cc máx: 50 mg/mL)",
        solventes: "SF (No se recomienda diluir en DX5%)",
        via: "IV lenta: 15-30 min. Bolo: 3-5 min. Infusión prolongada: 3 hs.",
        estabilidad: "R: 8 hs a T° Amb / 24 hs en heladera. D: 4 hs a T° Amb / 24 hs en heladera. Usar inmediatamente tras dilución.",
        observaciones: "No se recomienda diluir en Dextrosa al 5%.",
        semaforo: {
            prohibido: "Evitar la dilución en Dextrosa al 5% por inestabilidad de la droga.",
            precaucion: "El bolo endovenoso (3-5 min) está estrictamente limitado a dosis de hasta 1 gramo.",
            seguro: "Es idóneo para infusión prolongada de 3 horas o infusión lenta de 15 a 30 minutos en SF."
        }
    },
    {
        id: "metronidazol",
        nombre: "Metronidazol",
        presentacion: "500 mg / 100 mL sachet",
        reconstitucion: "No corresponde",
        dilucion: "No corresponde",
        solventes: "No corresponde",
        via: "IV lenta: 20 min. No recomendada: bolo, IM, SC.",
        estabilidad: "En heladera precipita.",
        observaciones: "Proteger de la luz. NO refrigerar ni almacenar en frío porque se forman cristales.",
        semaforo: {
            prohibido: "PROHIBIDO GUARDAR EN HELADERA (se cristaliza por completo). Prohibido en bolo, IM o SC.",
            precaucion: "Asegurar la protección de la luz. Verificar visualmente la ausencia de cristales antes de colgar.",
            seguro: "Infusión rápida del sachet preconfigurado en un tiempo de 20 minutos."
        }
    },
    {
        id: "penicilina_g_benzatinica",
        nombre: "Penicilina G Benzatínica",
        presentacion: "2.400.000 UI F/A",
        reconstitucion: "5 mL de API + 5 mL de lidocaína al 1%, o 10 mL de lidocaína al 1%.",
        dilucion: "No corresponde",
        solventes: "No corresponde",
        via: "SÓLO IM PROFUNDA: 2-4 min. Preferentemente en cuadrante superoexterno del glúteo.",
        estabilidad: "Usar inmediatamente.",
        observaciones: "PROHIBIDA LA VÍA ENDOVENOSA. Agitar enérgicamente el vial hasta completa dispersión. Administrar lento y constante para evitar obstruir la aguja.",
        semaforo: {
            prohibido: "ESTRICTAMENTE PROHIBIDA LA VÍA ENDOVENOSA (Riesgo mortal por embolia). No diluir.",
            precaucion: "Agitar el frasco con fuerza antes de aspirar. Pasar de forma lenta y continua para que la suspensión blanquecina no tape la aguja.",
            seguro: "Administrar exclusivamente por vía Intramuscular profunda en glúteo."
        }
    },
    {
        id: "penicilina_g_sodica",
        nombre: "Penicilina G Sódica",
        presentacion: "1.000.000 UI o 3.000.000 UI F/A",
        reconstitucion: "5 mL de API",
        dilucion: "1.000.000 - 3.000.000 UI en 100 mL (Cc máx: 500.000 UI/mL)",
        solventes: "SF (De elección). DX5% (Menos estable).",
        via: "IV lenta: 30-60 min o Infusión continua (Diluir media dosis diaria en 500 mL de SF a pasar en 12s). No recomendado: bolo, IM.",
        estabilidad: "R y D: 24 hs a T° Amb y en heladera.",
        observaciones: "En infusión continua: diluir la mitad de la dosis de 24 hs en 500 mL de SF y programar a 12 horas.",
        semaforo: {
            prohibido: "No recomendado para inyección IM o administración en bolo.",
            precaucion: "Controlar el perfil de electrolitos en infusiones continuas prolongadas de dosis masivas.",
            seguro: "Infusión IV lenta estándar (30-60 min) o infusión continua en bomba de 12 horas."
        }
    },
    {
        id: "piperacilina_tazobactam",
        nombre: "Piperacilina-Tazobactam",
        presentacion: "4.5 gr F/A (4 gr piperacilina / 0.5 gr tazobactam)",
        reconstitucion: "20 mL de API o SF",
        dilucion: "4.5 gr en 100 mL (Cc máx: 200 mg/mL de piperacilina)",
        solventes: "SF, DX5% (Incompatible con Ringer Lactato)",
        via: "IV lenta: 30 min. No recomendada: bolo, IM, SC.",
        estabilidad: "R y D: 24 hs a T° Amb y en heladera.",
        observaciones: "Cada vial aporta un volumen de sodio de 9.4 mEq (216 mg). Incompatible con aminoglucósidos y soluciones que contengan RL.",
        semaforo: {
            prohibido: "INCOMPATIBLE CON RINGER LACTATO (Precipita). No administrar simultáneamente con aminoglucósidos por la misma vía. No usar bolo.",
            precaucion: "Aporte de sodio considerable (216 mg por vial); precaución en pacientes cardiópatas o críticos con restricción hidrosalina.",
            seguro: "Goteo IV lento de 30 minutos diluido en SF o Dextrosa."
        }
    },
    {
        id: "rifampicina",
        nombre: "Rifampicina",
        presentacion: "600 mg F/A",
        reconstitucion: "10 mL de API",
        dilucion: "600 mg en 250 - 500 mL (Cc máx: 6 mg/mL)",
        solventes: "SF, DX5% (NO SE PUEDE REFRIGERAR)",
        via: "IV lenta: 30 min a 3 hs. No recomendado: infusión continua, bolo, SC, IM.",
        estabilidad: "R: 24 hs a T° Amb. D: 4 hs a T° Amb. NO REFRIGERAR (Precipita).",
        observaciones: "Se recomienda administrar dentro de las 4 hs de diluida para evitar su precipitación y descomposición.",
        semaforo: {
            prohibido: "PROHIBIDO REFRIGERAR LA SOLUCIÓN. No administrar en bolo, IM, SC o infusión continua.",
            precaucion: "Estabilidad de dilución extremadamente corta (máximo 4 horas). Debe infundirse rápido tras su preparación para que no precipite.",
            seguro: "Infusión lenta programada entre 30 minutos y 3 horas a temperatura ambiente."
        }
    },
    {
        id: "tigeciclina",
        nombre: "Tigeciclina",
        presentacion: "50 mg F/A",
        reconstitucion: "5 mL de SF o DX5%",
        dilucion: "50 mg en 100 mL (Cc máx: 1 mg/mL)",
        solventes: "SF, DX5%",
        via: "IV: 30-60 min. No recomendado: bolo, infusión continua, IM, SC.",
        estabilidad: "R: 6 hs a T° Amb. D: 24 hs a T° Amb y en heladera.",
        observaciones: "El sachet reconstituido tiene un color anaranjado característico.",
        semaforo: {
            prohibido: "Prohibido administrar en bolo, infusión continua, IM o subcutánea.",
            precaucion: "Estabilidad de reconstitución corta de solo 6 horas a temperatura ambiente.",
            seguro: "Goteo IV controlado a pasar en un periodo de 30 a 60 minutos."
        }
    },
    {
        id: "trimetoprima_sulfametoxazol",
        nombre: "Trimetoprima-Sulfametoxazol (TMS)",
        presentacion: "80 mg / 400 mg en amp. 5 mL",
        reconstitucion: "No corresponde",
        dilucion: "1 ampolla (5 mL) en 75 mL o 100 mL (Cc máx: 1 ampolla en 75 mL)",
        solventes: "SF, DX5%",
        via: "IV: 60 min. No recomendada: bolo, IM, SC.",
        estabilidad: "Utilizar inmediatamente. No refrigerar.",
        observaciones: "Debe administrarse inmediatamente tras su dilución para evitar precipitación espontánea en el sachet.",
        semaforo: {
            prohibido: "PROHIBIDO REFRIGERAR (provoca precipitación inmediata). Prohibido bolo, IM o SC.",
            precaucion: "Altamente inestable. Preparar al pie de cama e infundir inmediatamente. Descartar si se observa turbidez.",
            seguro: "Goteo endovenoso lento configurado para pasar en 60 minutos."
        }
    },
    {
        id: "vancomicina",
        nombre: "Vancomicina",
        presentacion: "1000 mg F/A",
        reconstitucion: "1 gr en 20 mL de API",
        dilucion: "500 mg en 100 mL (Cc máx: 5 mg/mL)",
        solventes: "SF, DX5%",
        via: "IV lenta: 60 min o más (Velocidad máx: 10 mg/min). IV continua: SÍ. No recomendado: bolo, IM, SC.",
        estabilidad: "R y D: 24 hs a T° Amb y en heladera.",
        observaciones: "En caso de Síndrome de Hombre Rojo o tromboflebitis, disminuir inmediatamente la velocidad de infusión.",
        semaforo: {
            prohibido: "PROHIBIDO BOLO DIRECTO, INYECCIÓN IM O SC (Causa necrosis y dolor extremo).",
            precaucion: "Monitorear la aparición de rubor en cuello y tronco (Síndrome de Hombre Rojo). No superar la velocidad de 10 mg/min.",
            seguro: "Goteo por bomba de infusión a pasar en un tiempo mínimo de 60 minutos."
        }
    },
    {
        id: "voriconazol",
        nombre: "Voriconazol",
        presentacion: "200 mg F/A",
        reconstitucion: "200 mg en 20 mL de API",
        dilucion: "200 mg en 100 mL (Cc máx: 5 mg/mL)",
        solventes: "SF, DX5%",
        via: "IV: 60-120 min. No recomendado: bolo, IM, SC, IV continua.",
        estabilidad: "R y D: 24 hs en heladera.",
        observaciones: "Cada vial contiene una carga importante de sodio: 9.4 mEq (217 mg). Riesgo de acumulación de excipiente con ClCr < 50 mL/min.",
        semaforo: {
            prohibido: "PROHIBIDO en bolo, IM, SC o infusión continua.",
            precaucion: "Monitorear estrechamente la función renal si el aclaramiento de creatinina (ClCr) es inferior a 50 mL/min por acumulación del vehículo de infusión. Contiene 217 mg de sodio.",
            seguro: "Perfusión IV controlada lenta programada entre 60 y 120 minutos."
        }
    }
];


// Función del algoritmo de búsqueda
export function buscarFarmacos(criterio) {
    if (!criterio) return [];
    const query = criterio.toLowerCase().trim();
    return vademecumHospital.filter(f => 
        f.nombre.toLowerCase().includes(query) || 
        f.observaciones.toLowerCase().includes(query)
    );
}