# DSH 本地插件：便签 / 下班倒计时

两个 DeepSeek Harness Web 客户端插件，**预构建、零运行时依赖**：
`client.js` 是给宿主 ModuleLoader 的现成 bundle，`index.js` 的宿主半边是空实现，
装好后不需要任何构建步骤。

| 插件 | 目录 | 作用 |
| --- | --- | --- |
| `@local/sticky-notes` | `sticky-notes/` | 左侧边栏「便签」面板，Markdown + 自动保存 |
| `@local/offwork-countdown` | `offwork-countdown/` | 顶栏下班倒计时徽标、标签页倒计时、到点通知与遮罩 |

---

## 从 Git 安装（推荐）

前置条件：

- `dsh`：`npm i -g @deepseek-ai/dsh@0.2.1-rc.5`（与插件开发时一致）
- `pnpm` **≥ 9**，且必须在 PATH 上：`#path:` 子目录语法和 `dsh plugin` 都依赖它
- 仓库可被 `git clone`（私有库需提前配好 SSH key 或凭据）

```bash
dsh plugin --profile web add "github:runlijs/dsh-plugins#path:/sticky-notes"
dsh plugin --profile web add "github:runlijs/dsh-plugins#path:/offwork-countdown"
dsh web
```

`dsh plugin add` 会自动完成两件事，不用手改配置：

1. 在 `~/.dsh/profiles/web/package.json` 的 `dependencies` 写入该 spec；
2. 因为包声明了 `dsh.bundle.patch`，把包名追加进 `dsh.profile.bundles`。

验证：

```bash
dsh --profile web --dump-config | grep -E "sticky-notes|offwork-countdown"
```

### 固定版本 / 更新

```bash
# 按 tag 锁定（发布时打 tag：git tag v1.0.0 && git push --tags）
dsh plugin --profile web add "github:runlijs/dsh-plugins#v1.0.0&path:/sticky-notes"

# 更新到最新：重复执行同一条 add（会重新解析 HEAD），然后重启 dsh web
```

### 不想升级 pnpm（还是 8.x）

pnpm 8 不支持 `#path:` 子目录语法，两种选择：

- 把两个目录拆成两个仓库，各自在根目录，然后 `dsh plugin --profile web add github:runlijs/sticky-notes`；
- 或在目标机升级 pnpm：`npm i -g pnpm@latest`（profile 的 lockfile 会被重写一版，可接受）。

---

## 本机开发：link 源码目录

```bash
cd ~/dsh-plugins
dsh plugin --profile web add link:"$PWD/sticky-notes"
dsh plugin --profile web add link:"$PWD/offwork-countdown"
```

`link:` 记录的是绝对路径，**目录不能删也不能移动**，否则下次 `pnpm install` 会失败；
好处是改完文件重启宿主即生效。只想在一台机器上用时，这仍然是最省事的方式。

## 离线分发：tgz

```bash
cd sticky-notes && pnpm pack --pack-destination ../dist
dsh plugin --profile web add /path/to/local-sticky-notes-1.0.0.tgz
```

profile 里记录的是 tgz 的文件路径，**包要留着**。`dist/` 已在 `.gitignore` 中。

---

## 注意事项

- **数据不跟着插件走。** 便签在浏览器 `localStorage` 的 `dshStickyNotes.v1`，
  倒计时在 `offworkCountdown.endTime`；localStorage 还按 scheme+host+port 隔离，
  换电脑、换端口都是空数据，需要重新录入。
- **依赖与 bundle 列表必须同时存在**，只写 `dependencies` 不写 `dsh.profile.bundles`
  的表现是「装上了但界面没反应」。用 `dsh plugin` 安装不会踩到这一点。
- **DSH 版本要接近。** 插件用的是宿主注入的 `react` 和 `@deepseek-ai/dsh-client-ui-*`，
  跨大版本可能不兼容。
- **pnpm 拦截 git 包的 `prepare` 构建脚本。** 这两个包没有 `prepare`，正常不会触发；
  若以后加了构建步骤，需按 pnpm 提示把 key 写进
  `~/.dsh/profiles/web/pnpm-workspace.yaml` 的 `allowBuilds`。

## 目录结构

```
dsh-plugins/
├── sticky-notes/          # @local/sticky-notes
│   ├── index.js           # 宿主半边（空实现）
│   ├── client.js          # 浏览器 bundle（window.__ModuleLoader__.load）
│   ├── cordis.patch.yml   # bundle patch：插入插件节点
│   ├── locale/{zh,en}.json
│   └── icon.svg
└── offwork-countdown/     # @local/offwork-countdown，结构同上
```
