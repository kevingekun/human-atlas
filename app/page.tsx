import {flushSync} from 'react-dom';
import {registerAtlasTools} from './agent-tools';
import {useEffect, useMemo, useRef, useState} from 'react';
import {
    Activity,
    ArrowUpRight,
    ChevronRight,
    Focus,
    Info,
    Layers3,
    Pause,
    RotateCcw,
    RotateCw,
    Search,
    X
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Slider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';
import {Sheet, SheetContent, SheetTitle, SheetDescription} from '@/components/ui/sheet';
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty
} from '@/components/ui/combobox';
import AnatomyScene from './scene';
import {
    DEFAULT_VISIBLE,
    SYSTEMS,
    EXPLANATIONS,
    explanation,
    systemName,
    conceptName,
    searchMatches,
    t,
    type Atlas,
    type Concept,
    type Locale,
    type SceneState,
    type SystemId,
    type View
} from './anatomy';

const initial: SceneState = {
    explode: 0,
    visible: DEFAULT_VISIBLE,
    selected: [],
    isolate: false,
    view: 'three-quarter',
    rotate: false,
    reset: 0
};
export default function Home() {
    const detailTitle = useRef<HTMLHeadingElement>(null);
    const [locale, setLocale] = useState<Locale>('en'), [atlas, setAtlas] = useState<Atlas | null>(null), [state, setState] = useState(initial), [progress, setProgress] = useState(0), [error, setError] = useState(''), [panel, setPanel] = useState<'layers' | 'search' | null>(null), [details, setDetails] = useState(false), [about, setAbout] = useState(false), [query, setQuery] = useState(''), [chosen, setChosen] = useState<Concept | null>(null);
    useEffect(() => {
        const abort = new AbortController();
        setProgress(0);
        setError('');
        setAtlas(null);
        setChosen(null);
        setDetails(false);
        setState({...initial, visible: DEFAULT_VISIBLE});
        fetch('models/atlas.json', {signal: abort.signal}).then(r => {
            if (!r.ok) throw new Error(t('catalogueLoadError', locale));
            return r.json();
        }).then(data => setAtlas(data as Atlas)).catch(e => {
            if (e.name !== 'AbortError') setError(e.message);
        });
        return () => abort.abort();
    }, [locale]);
    useEffect(() => {
        const key = (e: KeyboardEvent) => {
            if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
                e.preventDefault();
                setPanel('search');
                setDetails(false);
            }
        };
        window.addEventListener('keydown', key);
        return () => window.removeEventListener('keydown', key);
    }, []);
    const parts = useMemo(() => new Map(atlas?.parts.map(p => [p.id, p])), [atlas]);
    const counts = useMemo(() => Object.fromEntries(SYSTEMS.map(s => [s.id, atlas?.parts.filter(p => p.system === s.id).length ?? 0])), [atlas]);
    const activeSystems = SYSTEMS.filter(s => counts[s.id] > 0);
    const selectedParts = state.selected.map(id => parts.get(id)).filter(p => !!p), selected = selectedParts[0],
        system = SYSTEMS.find(s => s.id === selected?.system);
    const visibleCount = atlas?.parts.filter(p => state.isolate ? state.selected.includes(p.id) : state.visible.includes(p.system) || state.selected.includes(p.id)).length ?? 0;
    const results = useMemo(() => {
        if (!atlas) return [];
        const term = query.toLowerCase().trim();
        if (!term) return ['heart', 'brain', 'liver', 'stomach', 'spleen', 'pancreas', 'urinary bladder', 'trachea'].map(name => atlas.concepts.find(c => c.name.toLowerCase() === name)).filter((x): x is Concept => !!x);
        return atlas.concepts.filter(c => searchMatches(c, term, locale)).sort((a, b) => a.name.length - b.name.length).slice(0, 80);
    }, [atlas, query, locale]);
    const choose = (c: Concept) => {
        setChosen(c);
        setState(s => ({...s, selected: c.elements, isolate: false, rotate: false}));
        setDetails(true);
        setPanel(null);
    };
    useEffect(() => {
        if (!atlas) return;
        return registerAtlasTools(atlas, c => flushSync(() => choose(c)));
    }, [atlas]);
    const choosePart = (id: string) => {
        const p = parts.get(id);
        if (!p) return;
        setChosen({id: p.conceptId, name: p.name, elements: [id]});
        setState(s => ({...s, selected: [id], isolate: false, rotate: false}));
        setDetails(true);
        setPanel(null);
    };
    const toggle = (id: SystemId) => {
        setDetails(false);
        setState(s => ({
            ...s,
            selected: [],
            isolate: false,
            visible: s.visible.includes(id) ? s.visible.filter(x => x !== id) : [...s.visible, id]
        }));
    };
    const reset = () => {
        setState(s => ({...initial, visible: DEFAULT_VISIBLE, reset: s.reset + 1}));
        setChosen(null);
        setDetails(false);
        setPanel(null);
    };
    const openPanel = (next: 'layers' | 'search') => {
        setDetails(false);
        setPanel(p => p === next ? null : next);
    };
    const toggleLocale = () => setLocale(l => l === 'en' ? 'zh' : 'en');
    return <main className="studio">
        {atlas && <AnatomyScene atlas={atlas} state={{...state, inspectorOpen: details && selectedParts.length > 0}}
                                onSelect={choosePart} onProgress={n => {
            setProgress(n);
            if (n === 100) setError('');
        }} onError={setError}/>}
        <div className="vignette"/>
        <header className="identity">
            <div className="eyebrow"><span className="status-dot"/> {t('interactiveAnatomy', locale)}</div>
            <h1>Human Atlas<Badge variant="outline" className="edition">3D</Badge></h1>
            <div className="identity-meta">{atlas ? atlas.parts.length.toLocaleString(locale) : '2,234'} {t('modeledPieces', locale)}
                <span>·</span> BodyParts3D
            </div>
        </header>
        <nav className="top-actions" aria-label="Explorer panels"><Button variant="ghost"
                                                                          className={panel === 'search' ? 'active' : ''}
                                                                          onClick={() => openPanel('search')}
                                                                          aria-label={t('searchAria', locale)}><Search
            size={18}/><span>{t('findStructure', locale)}</span><kbd>/</kbd></Button><Button variant="ghost" className="icon-button"
                                                                                 aria-label={t('aboutAtlas', locale)}
                                                                                 onClick={() => {
                                                                                     setDetails(false);
                                                                                     setPanel(null);
                                                                                     setAbout(true);
                                                                                 }}><Info size={18}/></Button><Button
            variant="ghost" className="icon-button lang-toggle" aria-label="Switch language"
            onClick={toggleLocale}><span className="lang-label">{locale === 'en' ? '中文' : 'En'}</span></Button></nav>
        <section className={`layers-panel glass ${panel === 'layers' ? 'mobile-open' : ''}`}
                 aria-label="Anatomical layers">
            <div className="panel-heading"><span>{t('systems', locale)}</span><Button variant="ghost"
                                                                       className="mobile-only icon-button"
                                                                       onClick={() => setPanel(null)}
                                                                       aria-label={t('closeSystems', locale)}><X
                size={18}/></Button><Badge variant="secondary"
                                           className="desktop-only small-number">{activeSystems.length}</Badge></div>
            <div className="layer-presets"><Button variant="ghost"
                                                   aria-pressed={activeSystems.every(x => state.visible.includes(x.id))}
                                                   onClick={() => setState(s => ({
                                                       ...s,
                                                       selected: [],
                                                       isolate: false,
                                                       visible: activeSystems.map(x => x.id)
                                                   }))}>{t('all', locale)}</Button><Button variant="ghost"
                                                                            aria-pressed={state.visible.length === 1 && state.visible[0] === 'skeletal'}
                                                                            onClick={() => setState(s => ({
                                                                                ...s,
                                                                                selected: [],
                                                                                isolate: false,
                                                                                visible: ['skeletal']
                                                                            }))}>{t('skeleton', locale)}</Button><Button
                variant="ghost"
                aria-pressed={state.visible.length === 6 && ['cardiac', 'respiratory', 'digestive', 'urinary', 'endocrine', 'reproductive'].every(id => state.visible.includes(id as SystemId))}
                onClick={() => setState(s => ({
                    ...s,
                    selected: [],
                    isolate: false,
                    visible: ['cardiac', 'respiratory', 'digestive', 'urinary', 'endocrine', 'reproductive']
                }))}>{t('organs', locale)}</Button></div>
            <div className="system-list">{activeSystems.map(s => <div
                className={`system-row ${state.visible.includes(s.id) ? 'enabled' : ''}`} key={s.id}><Button
                variant="ghost" className="system-name" title={`${t('showOnly', locale)} ${systemName(s.id, locale)}`}
                onClick={() => setState(v => ({...v, visible: [s.id], isolate: false, selected: []}))}><span
                className="system-dot" style={{background: s.color}}/>{systemName(s.id, locale)}<span
                className="system-count">{counts[s.id]}</span></Button><Switch checked={state.visible.includes(s.id)}
                                                                               onCheckedChange={() => toggle(s.id)}
                                                                               aria-label={`${t('show', locale)} ${systemName(s.id, locale)}`}/>
            </div>)}</div>
            <div className="panel-foot"><span>{visibleCount.toLocaleString(locale)} {t('piecesVisible', locale)}</span><Button
                variant="ghost" onClick={() => setState(s => ({...s, visible: [], selected: [], isolate: false}))}>{t('hideAll', locale)}</Button></div>
        </section>
        {panel === 'search' && <section className="search-panel glass" aria-label="Find anatomy">
            <div className="panel-heading"><span>{t('findStructure', locale)}</span><Button variant="ghost" className="icon-button"
                                                                                onClick={() => setPanel(null)}
                                                                                aria-label={t('closeSearch', locale)}><X size={18}/></Button>
            </div>
            <Combobox<Concept> items={results} value={null} onValueChange={value => {
                if (value) choose(value);
            }} inputValue={query} onInputValueChange={setQuery} itemToStringLabel={c => c.name} filter={null} open
                               onOpenChange={open => {
                                   if (!open) setPanel(null);
                               }}><ComboboxInput autoFocus placeholder={t('searchPlaceholder', locale)}
                                                 aria-label={t('searchAria', locale)}
                                                 showTrigger={false}/><ComboboxContent
                className="anatomy-search-results"><ComboboxEmpty>{t('noMatch', locale)}</ComboboxEmpty><ComboboxList>{(c: Concept) => <ComboboxItem key={c.id} value={c}><span
                className="search-result-name">{conceptName(c.name, locale)}</span><span
                className="small-number">{c.elements.length} {c.elements.length === 1 ? t('pieces', locale).replace('个', '') || 'piece' : t('pieces', locale)}</span></ComboboxItem>}</ComboboxList></ComboboxContent></Combobox>
            <p className="search-note">{query ? t('searchNoteQuery', locale) : t('searchNoteDefault', locale)}</p>
        </section>}
        <nav className="view-controls glass"
             aria-label={t('cameraControls', locale)}>{(['three-quarter', 'front', 'side', 'back'] as View[]).map((v, i) => <Button
            variant="ghost" key={v} className={state.view === v ? 'active' : ''} aria-pressed={state.view === v}
            disabled={state.explode > .8 && v !== 'front'}
            onClick={() => setState(s => ({...s, view: v, reset: s.reset + 1, rotate: false}))} title={`${v} ${t('view', locale)}`}
            aria-label={`${v} ${t('view', locale)}`}><span>{['¾', 'F', 'S', 'B'][i]}</span></Button>)}<i/><Button variant="ghost"
                                                                                                  disabled={state.explode >= .4}
                                                                                                  aria-label={state.rotate ? t('pauseRotation', locale) : t('rotateBody', locale)}
                                                                                                  title={t('autoRotate', locale)}
                                                                                                  className={state.rotate ? 'active' : ''}
                                                                                                  onClick={() => setState(s => ({
                                                                                                      ...s,
                                                                                                      rotate: !s.rotate
                                                                                                  }))}>{state.rotate ?
            <Pause size={17}/> : <RotateCw size={18}/>}</Button><Button variant="ghost"
                                                                        aria-label={t('resetView', locale)} title={t('reset', locale)}
                                                                        onClick={reset}><RotateCcw size={17}/></Button>
        </nav>
        <div className="scene-caption"><span
            className="caption-line"/><span>{state.isolate ? (chosen ? conceptName(chosen.name, locale) : t('selectedStructure', locale)) : state.explode > .95 ? t('anatomicalInventory', locale) : state.explode > .05 ? t('separatedStructures', locale) : t('adultHumanMale', locale)}</span><span
            className="caption-line"/></div>
        <div className="bottom-dock glass"><Button variant="ghost" className="mobile-only dock-layers"
                                                   onClick={() => openPanel('layers')}
                                                   aria-label={t('openSystemLayers', locale)}><Layers3
            size={20}/><span>{t('systems', locale)}</span></Button>
            <div className="explode-control">
                <div className="explode-label"><label id="explode-label">{t('explodeAnatomy', locale)}</label>
                    <output>{Math.round(state.explode * 100)}<span>%</span></output>
                </div>
                <Slider aria-labelledby="explode-label" min={0} max={100} step={1} value={[state.explode * 100]}
                        onValueChange={v => setState(s => ({
                            ...s,
                            explode: (Array.isArray(v) ? v[0] : v) / 100,
                            view: (Array.isArray(v) ? v[0] : v) > 80 ? 'front' : s.view,
                            rotate: false
                        }))}/>
                <div className="slider-endpoints"><span>{t('assembled', locale)}</span><span>{t('everyPiece', locale)}</span></div>
            </div>
            <Button variant="ghost" className="dock-reset" onClick={reset} aria-label={t('assembleAndReset', locale)}><RotateCcw
                size={18}/><span>{t('reset', locale)}</span></Button></div>
        <footer className="studio-footer"><span>{state.explode > .8 ? t('dragToPan', locale) : t('dragToOrbit', locale)} <b>·</b> {t('pinchToZoom', locale)} <b>·</b> {t('tapToInspect', locale)}</span><Button
            variant="ghost" onClick={() => {
            setDetails(false);
            setPanel(null);
            setAbout(true);
        }}>{t('sourceCredits', locale)} <ArrowUpRight size={12}/></Button></footer>
        {progress < 100 && !error && <div className="loading glass" role="status"><Activity size={18}/>
            <div><strong>{t('preparingAnatomy', locale)}</strong><span>{progress}% · {t('loadingPieces', locale)} {atlas?.parts.length.toLocaleString(locale) ?? '2,234'} {t('pieces', locale)}</span>
                <div className="loading-track"><i style={{width: `${progress}%`}}/></div>
            </div>
        </div>}
        {error && <div className="loading glass error" role="alert"><p>{error}</p><Button variant="ghost"
                                                                                          onClick={() => location.reload()}>{t('reloadViewer', locale)}
            </Button></div>}
        <Sheet open={details && selectedParts.length > 0} modal={false} disablePointerDismissal
               onOpenChange={setDetails}><SheetContent initialFocus={detailTitle}
                                                       className={`detail-sheet glass ${state.isolate ? 'is-isolated' : ''}`}
                                                       showCloseButton={true}>
            <div className="detail-header">
                <div className="detail-accent" style={{background: system?.color}}/>
                <div className="eyebrow">{system ? systemName(system.id, locale) : t('anatomy', locale)}</div>
                <SheetTitle ref={detailTitle} tabIndex={-1} className="structure-title">{chosen ? conceptName(chosen.name, locale) : ''}</SheetTitle>
            </div>
            <div className="detail-scroll" key={`${chosen?.id}-${state.isolate}`}><SheetDescription
                className="structure-description">{chosen && selected ? explanation(chosen.name, selected.system, locale) : ''}</SheetDescription>{chosen && !EXPLANATIONS[chosen.name.toLowerCase()] &&
                <span className="context-note">{t('systemOverview', locale)}</span>}
                <div className="structure-meta"><span>{t('atlasReference', locale)}<strong>{chosen?.id}</strong></span><span>{t('selectedPieces', locale)}<strong>{state.selected.length.toLocaleString(locale)}</strong></span>
                </div>
                {selectedParts.length > 1 &&
                    <div className="member-list"><h3>{t('includedStructures', locale)}</h3>{selectedParts.slice(0, 50).map(p =>
                        <Button variant="ghost" key={p.id}
                                onClick={() => choosePart(p.id)}><span>{conceptName(p.name, locale)}</span><ChevronRight
                            size={14}/></Button>)}{selectedParts.length > 50 &&
                        <p>{t('andMorePieces', locale)} {selectedParts.length - 50} {t('moreModeledPieces', locale)}</p>}</div>}<a className="source-link"
                                                                                              href="https://lifesciencedb.jp/bp3d/"
                                                                                              target="_blank"
                                                                                              rel="noreferrer">{t('viewSource', locale)}
                    <ArrowUpRight size={14}/></a></div>
            <div className="detail-actions"><Button className={`primary-action ${state.isolate ? 'active' : ''}`}
                                                    onClick={() => setState(s => ({
                                                        ...s,
                                                        isolate: !s.isolate,
                                                        explode: 0
                                                    }))}><Focus
                size={18}/>{state.isolate ? t('showSurrounding', locale) : t('isolateStructure', locale)}<ChevronRight
                size={16}/></Button><Button variant="ghost" className="secondary-action" onClick={() => {
                setState(s => ({...s, selected: [], isolate: false}));
                setDetails(false);
            }}>{t('clearSelection', locale)}</Button></div>
        </SheetContent></Sheet>
        <Sheet open={about} onOpenChange={setAbout}><SheetContent className="about-sheet glass">
            <div className="eyebrow">{t('sourceScope', locale)}</div>
            <SheetTitle className="structure-title">{t('bodyRevealed', locale)}</SheetTitle><SheetDescription>{t('exploreBodyParts3D', locale)}</SheetDescription>
            <div className="about-copy"><p><strong>{t('maleBodyParts3D', locale)}</strong><br/>2,234 {t('introMeshesConcepts', locale)} 3,432
                {t('introNamedConcepts', locale)}</p><p>{t('introDisclaimer', locale)}</p><p>{t('introGeometry', locale)}</p><h3>{t('source', locale)}</h3><p>{t('bodyParts3DLicense', locale)}</p><a
                href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html" target="_blank" rel="noreferrer">{t('datasetLicense', locale)}
                <ArrowUpRight size={14}/></a><a
                href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" target="_blank" rel="noreferrer">{t('originalGeometry', locale)}
                <ArrowUpRight size={14}/></a><a
                href="https://academic.oup.com/nar/article/37/suppl_1/D782/1000752" target="_blank" rel="noreferrer">{t('readPublication', locale)}
                <ArrowUpRight size={14}/></a></div>
        </SheetContent></Sheet>
    </main>;
}
