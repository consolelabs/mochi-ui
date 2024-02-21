RELEASE_BRANCH=main
BETA_BRANCH=mochi-web-preview
DEVELOP_BRANCH=mochi-web-preview

.PHONY: release
release: sync-release
	git checkout $(BETA_BRANCH) && git pull origin $(BETA_BRANCH) && \
		git checkout $(RELEASE_BRANCH) && git pull origin $(RELEASE_BRANCH) && \
		git merge $(BETA_BRANCH) --no-edit --no-ff && \
		git push origin $(RELEASE_BRANCH) && \
		git checkout $(DEVELOP_BRANCH) && git push origin $(DEVELOP_BRANCH)

.PHONY: sync-release
sync-release:
	git checkout $(RELEASE_BRANCH) && git pull origin $(RELEASE_BRANCH) && \
		git checkout $(BETA_BRANCH) && git pull origin $(BETA_BRANCH) && \
		git merge $(RELEASE_BRANCH) --no-edit --no-ff
