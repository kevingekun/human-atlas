export type SystemId =
    'skeletal'
    | 'muscular'
    | 'arterial'
    | 'venous'
    | 'nervous'
    | 'digestive'
    | 'respiratory'
    | 'urinary'
    | 'reproductive'
    | 'lymphatic'
    | 'endocrine'
    | 'integumentary'
    | 'connective'
    | 'sensory'
    | 'cardiac';

export type Locale = 'en' | 'zh';

export const SYSTEMS: {
    id: SystemId;
    name: string;
    nameZh: string;
    color: string;
    description: string;
    descriptionZh: string;
}[] = [
    {
        id: 'skeletal',
        name: 'Skeleton',
        nameZh: '骨骼系统',
        color: '#e2d9ba',
        description: 'Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.',
        descriptionZh: '骨骼构成身体的支撑框架，保护器官，并为肌肉提供附着点。其内部组织还储存矿物质并产生血细胞。'
    },
    {
        id: 'muscular',
        name: 'Muscles',
        nameZh: '肌肉系统',
        color: '#a85b50',
        description: 'Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.',
        descriptionZh: '骨骼肌通过牵拉附着点产生运动。与肌腱一起，它们活动关节、稳定姿势并产生热量。'
    },
    {
        id: 'cardiac',
        name: 'Heart',
        nameZh: '心脏',
        color: '#b96760',
        description: 'The heart is a muscular pump with four chambers. Its valves direct blood forward through the pulmonary and systemic circuits.',
        descriptionZh: '心脏是一个具有四个腔室的肌肉泵。其瓣膜引导血液向前流经肺循环和体循环。'
    },
    {
        id: 'sensory',
        name: 'Sensory organs',
        nameZh: '感觉器官',
        color: '#b0c8ce',
        description: 'These structures contribute to special senses, including sight, hearing, and balance. Their specialized tissues detect stimuli and work with the nervous system to convey information.',
        descriptionZh: '这些结构贡献于特殊感觉，包括视觉、听觉和平衡。其特化组织检测刺激，并与神经系统协作传递信息。'
    },
    {
        id: 'arterial',
        name: 'Arteries',
        nameZh: '动脉系统',
        color: '#c05245',
        description: 'The heart drives blood through the circulation. Arteries carry blood away from the heart to supply tissues or, in the pulmonary circuit, to the lungs.',
        descriptionZh: '心脏推动血液在循环系统中流动。动脉将血液从心脏输送到全身组织，在肺循环中则输送至肺部。'
    },
    {
        id: 'venous',
        name: 'Veins',
        nameZh: '静脉系统',
        color: '#527c9f',
        description: 'Veins return blood toward the heart. Superficial and deep networks collect blood from the tissues; the pulmonary veins bring oxygenated blood back from the lungs.',
        descriptionZh: '静脉将血液回输至心脏。浅表和深层静脉网络从组织中收集血液；肺静脉将含氧血液从肺部带回。'
    },
    {
        id: 'nervous',
        name: 'Nervous system',
        nameZh: '神经系统',
        color: '#d8b565',
        description: 'The brain, spinal cord, and peripheral nerves carry and process signals. They support sensation, movement, coordination, and automatic regulation of body functions.',
        descriptionZh: '大脑、脊髓和周围神经传递并处理信号。它们支持感觉、运动、协调和身体功能的自动调节。'
    },
    {
        id: 'respiratory',
        name: 'Respiratory',
        nameZh: '呼吸系统',
        color: '#b98991',
        description: 'The airways conduct air to the lungs, where oxygen and carbon dioxide move between air and blood. Breathing depends on pressure changes produced by respiratory muscles.',
        descriptionZh: '气道将空气输送至肺部，在那里氧气和二氧化碳在空气与血液之间交换。呼吸依赖于呼吸肌产生的压力变化。'
    },
    {
        id: 'digestive',
        name: 'Digestive',
        nameZh: '消化系统',
        color: '#b8916b',
        description: 'The digestive tract breaks down food, absorbs nutrients and water, and moves waste onward. Accessory organs contribute bile and digestive enzymes.',
        descriptionZh: '消化道分解食物，吸收营养和水分，并将废物向前输送。辅助器官提供胆汁和消化酶。'
    },
    {
        id: 'urinary',
        name: 'Urinary',
        nameZh: '泌尿系统',
        color: '#b47961',
        description: 'The kidneys filter blood and regulate fluid, electrolyte, and acid–base balance. Urine travels through the ureters to the bladder and exits through the urethra.',
        descriptionZh: '肾脏过滤血液并调节体液、电解质和酸碱平衡。尿液通过输尿管进入膀胱，再经尿道排出体外。'
    },
    {
        id: 'lymphatic',
        name: 'Lymphatic',
        nameZh: '淋巴系统',
        color: '#879f7c',
        description: 'Lymphatic vessels return excess tissue fluid to the circulation. Lymph nodes and other lymphoid organs support immune surveillance and responses.',
        descriptionZh: '淋巴管将多余的组织液回输至循环系统。淋巴结和其他淋巴器官支持免疫监视和免疫应答。'
    },
    {
        id: 'endocrine',
        name: 'Endocrine',
        nameZh: '内分泌系统',
        color: '#c5a09a',
        description: 'Endocrine organs release hormones into the blood to coordinate processes such as metabolism, growth, stress responses, and reproduction.',
        descriptionZh: '内分泌器官向血液中释放激素，以协调代谢、生长、应激反应和生殖等过程。'
    },
    {
        id: 'reproductive',
        name: 'Reproductive',
        nameZh: '生殖系统',
        color: '#bda098',
        description: 'The male reproductive structures represented here contribute to sperm production, maturation, transport, and the production of sex hormones.',
        descriptionZh: '此处展示的男性生殖结构参与精子的产生、成熟、运输以及性激素的分泌。'
    },
    {
        id: 'integumentary',
        name: 'Body surface',
        nameZh: '体表系统',
        color: '#ba9b7d',
        description: 'The body surface provides an outer anatomical reference. The integumentary system forms a protective barrier and contributes to sensation and temperature regulation.',
        descriptionZh: '体表提供了外部解剖参考。外皮系统形成保护屏障，并参与感觉和体温调节。'
    },
    {
        id: 'connective',
        name: 'Connective tissue',
        nameZh: '结缔组织',
        color: '#aec3bb',
        description: 'Cartilage, ligaments, and other connective tissues support, connect, and separate structures. Their roles include stabilizing joints and distributing mechanical loads.',
        descriptionZh: '软骨、韧带和其他结缔组织支持、连接并分隔结构。其作用包括稳定关节和分配机械负荷。'
    },
];

export function systemName(systemId: SystemId, locale: Locale) {
    const s = SYSTEMS.find(s => s.id === systemId);
    return locale === 'zh' ? s?.nameZh ?? s?.name ?? '' : s?.name ?? '';
}

export function systemDescription(systemId: SystemId, locale: Locale) {
    const s = SYSTEMS.find(s => s.id === systemId);
    return locale === 'zh' ? s?.descriptionZh ?? s?.description ?? '' : s?.description ?? '';
}

export interface Part {
    id: string;
    name: string;
    conceptId: string;
    system: SystemId;
    chunk: number;
    positions: number;
    normals: number;
    indices: number;
    vertexCount: number;
    indexCount: number;
    bounds: [number[], number[]]
}

export interface Concept {
    id: string;
    name: string;
    elements: string[]
}

export interface Atlas {
    version: string;
    sex?: 'male';
    source?: string;
    scope?: string;
    parts: Part[];
    concepts: Concept[];
    chunks: { url: string; bytes: number; gzip?: string; gzipBytes?: number }[];
    triangles: number
}

export type View = 'three-quarter' | 'front' | 'back' | 'side';

export interface SceneState {
    inspectorOpen?: boolean;
    explode: number;
    visible: SystemId[];
    selected: string[];
    isolate: boolean;
    view: View;
    rotate: boolean;
    reset: number
}

export const DEFAULT_VISIBLE: SystemId[] = ['cardiac', 'sensory', 'skeletal', 'muscular', 'arterial', 'venous', 'nervous', 'respiratory', 'digestive', 'urinary', 'lymphatic', 'endocrine', 'reproductive', 'connective'];

export const EXPLANATIONS: Record<string, string> = {
    'heart': 'A muscular pump in the chest. Its right side sends blood to the lungs; its left side sends blood through the systemic circulation.',
    'liver': 'A large organ beneath the right side of the diaphragm. It processes absorbed nutrients, produces bile, and synthesizes many proteins carried in the blood.',
    'brain': 'The central organ of the nervous system. Its interconnected regions support perception, movement, memory, language, and the regulation of bodily functions.',
    'stomach': 'A muscular chamber between the esophagus and small intestine. It stores and mixes food with acid and enzymes before releasing it into the duodenum.',
    'spleen': 'A lymphoid organ in the upper left abdomen. It filters blood, removes aging blood cells, and participates in immune responses.',
    'pancreas': 'An abdominal organ with digestive and endocrine roles. It supplies enzymes to the small intestine and releases hormones including insulin and glucagon.',
    'urinary bladder': 'A muscular reservoir in the pelvis that stores urine arriving from the kidneys through the ureters.',
    'trachea': 'The main airway connecting the larynx to the bronchi. Its cartilage supports keep the airway open during breathing.',
    'diaphragm': 'A broad muscle separating the chest and abdomen. When it contracts, it increases chest volume and helps draw air into the lungs.',
};

export const EXPLANATIONS_ZH: Record<string, string> = {
    'heart': '位于胸腔内的肌肉泵。右侧将血液输送至肺部；左侧将血液输送至全身循环。',
    'liver': '位于膈肌右侧下方的大器官。它处理吸收的营养物质，产生胆汁，并合成血液中携带的许多蛋白质。',
    'brain': '神经系统的中央器官。其相互连接的区域支持感知、运动、记忆、语言和身体功能的调节。',
    'stomach': '位于食道和小肠之间的肌肉腔。它储存食物并与酸和酶混合，然后将其释放到十二指肠。',
    'spleen': '位于左上腹部的淋巴器官。它过滤血液，清除衰老的血细胞，并参与免疫反应。',
    'pancreas': '具有消化和内分泌功能的腹部器官。它向小肠提供酶，并释放包括胰岛素和胰高血糖素在内的激素。',
    'urinary bladder': '位于盆腔内的肌肉储尿器，储存从肾脏通过输尿管输送来的尿液。',
    'trachea': '连接喉部和支气管的主要气道。其软骨支撑在呼吸时保持气道开放。',
    'diaphragm': '分隔胸腔和腹腔的宽阔肌肉。当它收缩时，增加胸腔容积并帮助将空气吸入肺部。',
};

export function explanation(name: string, system: SystemId, locale: Locale = 'en') {
    const key = name.toLowerCase();
    if (locale === 'zh') {
        return EXPLANATIONS_ZH[key] ?? systemDescription(system, 'zh');
    }
    return EXPLANATIONS[key] ?? systemDescription(system, 'en');
}

export const UI_LABELS: Record<string, Record<Locale, string>> = {
    interactiveAnatomy: { en: 'INTERACTIVE ANATOMY', zh: '交互式解剖' },
    modeledPieces: { en: 'modeled pieces', zh: '个模型部件' },
    findStructure: { en: 'Find a structure', zh: '查找结构' },
    aboutAtlas: { en: 'About this atlas', zh: '关于此图谱' },
    systems: { en: 'Systems', zh: '系统' },
    closeSystems: { en: 'Close systems', zh: '关闭系统' },
    all: { en: 'All', zh: '全部' },
    skeleton: { en: 'Skeleton', zh: '骨骼' },
    organs: { en: 'Organs', zh: '器官' },
    showOnly: { en: 'Show only', zh: '仅显示' },
    show: { en: 'Show', zh: '显示' },
    piecesVisible: { en: 'pieces visible', zh: '个部件可见' },
    hideAll: { en: 'Hide all', zh: '全部隐藏' },
    closeSearch: { en: 'Close search', zh: '关闭搜索' },
    searchPlaceholder: { en: 'Heart, femur, cranial nerve…', zh: '心脏、股骨、颅神经…' },
    searchAria: { en: 'Search named anatomical structures', zh: '搜索命名解剖结构' },
    noMatch: { en: 'No structures match your search.', zh: '没有匹配的结构。' },
    searchNoteQuery: { en: 'Showing up to 80 matches. Refine your search to find smaller structures.', zh: '最多显示 80 个匹配项。细化搜索以查找更小的结构。' },
    searchNoteDefault: { en: 'Start with a major organ, or search every named structure.', zh: '从主要器官开始，或搜索每个命名结构。' },
    cameraControls: { en: 'Camera controls', zh: '相机控制' },
    view: { en: 'view', zh: '视图' },
    autoRotate: { en: 'Auto rotate', zh: '自动旋转' },
    rotateBody: { en: 'Rotate body', zh: '旋转身体' },
    pauseRotation: { en: 'Pause rotation', zh: '暂停旋转' },
    resetView: { en: 'Reset view and layers', zh: '重置视图和图层' },
    adultHumanMale: { en: 'ADULT HUMAN · MALE', zh: '成年男性人体' },
    separatedStructures: { en: 'SEPARATED STRUCTURES', zh: '分离的结构' },
    anatomicalInventory: { en: 'ANATOMICAL INVENTORY', zh: '解剖清单' },
    selectedStructure: { en: 'SELECTED STRUCTURE', zh: '已选结构' },
    openSystemLayers: { en: 'Open system layers', zh: '打开系统图层' },
    explodeAnatomy: { en: 'Explode anatomy', zh: '解剖爆炸图' },
    assembled: { en: 'Assembled', zh: '组合' },
    everyPiece: { en: 'Every piece', zh: '每个部件' },
    reset: { en: 'Reset', zh: '重置' },
    assembleAndReset: { en: 'Assemble and reset', zh: '组合并重置' },
    dragToOrbit: { en: 'Drag to orbit', zh: '拖动旋转' },
    dragToPan: { en: 'Drag to pan', zh: '拖动平移' },
    pinchToZoom: { en: 'Pinch to zoom', zh: '捏合缩放' },
    tapToInspect: { en: 'Tap to inspect', zh: '点击查看' },
    sourceCredits: { en: 'Source & credits', zh: '来源与致谢' },
    preparingAnatomy: { en: 'Preparing the anatomy', zh: '准备解剖模型' },
    loadingPieces: { en: 'Loading', zh: '加载' },
    pieces: { en: 'pieces', zh: '个部件' },
    catalogueLoadError: { en: 'The anatomy catalogue could not be loaded.', zh: '无法加载解剖目录。' },
    webglError: { en: 'This browser could not start the 3D viewer. Please try a browser with WebGL enabled.', zh: '此浏览器无法启动 3D 查看器。请尝试启用 WebGL 的浏览器。' },
    reloadViewer: { en: 'Reload viewer', zh: '重新加载查看器' },
    anatomy: { en: 'ANATOMY', zh: '解剖' },
    systemOverview: { en: 'System overview · structure identified from source anatomy', zh: '系统概览 · 从源解剖中识别的结构' },
    atlasReference: { en: 'Atlas reference', zh: '图谱参考' },
    selectedPieces: { en: 'Selected pieces', zh: '已选部件' },
    includedStructures: { en: 'Included structures', zh: '包含的结构' },
    andMorePieces: { en: 'And', zh: '以及另外' },
    moreModeledPieces: { en: 'more modeled pieces.', zh: '个模型部件。' },
    viewSource: { en: 'View anatomical source', zh: '查看解剖来源' },
    isolateStructure: { en: 'Isolate structure', zh: '隔离结构' },
    showSurrounding: { en: 'Show surrounding anatomy', zh: '显示周围解剖结构' },
    clearSelection: { en: 'Clear selection', zh: '清除选择' },
    sourceScope: { en: 'SOURCE & SCOPE', zh: '来源与范围' },
    bodyRevealed: { en: 'A body, revealed.', zh: '人体揭秘。' },
    exploreBodyParts3D: { en: 'Explore the adult male reference anatomy from BodyParts3D.', zh: '探索来自 BodyParts3D 的成年男性参考解剖。' },
    maleBodyParts3D: { en: 'Male · BodyParts3D', zh: '男性 · BodyParts3D' },
    introMeshesConcepts: { en: 'individual meshes and', zh: '个独立网格和' },
    introNamedConcepts: { en: 'named concepts from an adult male reference anatomy.', zh: '个命名概念，来自成年男性参考解剖。' },
    introDisclaimer: { en: 'This reference does not contain every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.', zh: '此参考不包含所有人体结构或变异。命名概念可包含多个部件；每个源网格仅渲染一次。' },
    introGeometry: { en: 'Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.', zh: '颜色和系统分组旨在便于探索。几何体针对网络进行了简化，简短说明提供一般教育背景。这是解剖学参考，而非诊断或手术工具。' },
    source: { en: 'Source', zh: '来源' },
    bodyParts3DLicense: { en: 'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.', zh: 'BodyParts3D，© 生命科学数据库中心，依据 CC Attribution 4.0 International 许可。' },
    datasetLicense: { en: 'Dataset license', zh: '数据集许可' },
    originalGeometry: { en: 'Original geometry & metadata', zh: '原始几何体与元数据' },
    readPublication: { en: 'Read the source publication', zh: '阅读原始出版物' },
};

export function t(key: string, locale: Locale): string {
    return UI_LABELS[key]?.[locale] ?? key;
}

// Concept name translations from atlas.json
import {CONCEPT_NAMES_ZH} from './concept-translations';

export function conceptName(name: string, locale: Locale): string {
    if (locale === 'en') return name;
    return CONCEPT_NAMES_ZH[name] ?? name;
}

export function searchMatches(concept: Concept, query: string, locale: Locale): boolean {
    const term = query.toLowerCase().trim();
    if (!term) return true;
    if (concept.name.toLowerCase().includes(term)) return true;
    if (concept.id.toLowerCase().includes(term)) return true;
    if (locale === 'zh') {
        const zhName = CONCEPT_NAMES_ZH[concept.name];
        if (zhName && zhName.toLowerCase().includes(term)) return true;
    }
    return false;
}
