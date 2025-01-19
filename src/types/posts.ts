interface FooterTypes {
  "com.linkedin.voyager.feed.render.ConversationStartersComponent": {
    conversationStarters: {
      displayText: string;
      text: string;
      trackingId: string;
    }[];
    trackingId: string;
  }
}

interface HeaderTypes {
  image: {
    accessibilityTextAttributes: any[];
    accessibilityText: string;
    attributes: {
      sourceType: string;
      miniProfile: ActorMiniProfileTypes;
    }[]
  };
  navigationContext: {
    trackingActionType: string;
    accessibilityText: string;
    actionTarget: string;
  };
  text: {
    textDirection: string;
    attributes: {
      start: number;
      length: number;
      miniProfile: ActorMiniProfileTypes;
      type: string;
    }[];
    text: string;
  };
  imageNavigationContext: {
    trackingActionType: string;
    accessibilityText: string;
    actionTarget: string;
  }
}

interface ContentTypes {
  "com.linkedin.voyager.feed.render.ImageComponent"?: {
    images: {
      accessibilityTextSourceType: string;
      attributes: {
        useCropping: boolean;
        mediaUrn: string;
        sourceType: string;
        vectorImage: {
          digitalmediaAsset: string;
          artifacts: {
            width: number;
            height: number;
            expiresAt: number;
            fileIdentifyingUrlPathSegment: string;
          }[];
          rootUrl: string;
        };
        displayAspectRatio: number;
      }[];
      editableAccessibilityText: boolean;
      accessibilityTextAttributes: any[];
      accessibilityText: string;
    }[];
    showTemplateCta?: boolean;
  };
  "com.linkedin.voyager.feed.render.LinkedInVideoComponent"?: {
    headlineBackgroundColor: string;
    saveAction: {
      entityUrn: string;
      saved: boolean;
      dashEntityUrn: string;
    };
    mediaDisplayVariant: string;
    nonMemberActorUrn?: string;
    tapTargets: any[];
    videoPlayMetadata: {
      duration: number;
      thumbnail: VectorImageTypes;
      progressiveStreams: {
        width: number;
        streamingLocations: {
          url: string;
          expiresAt: number;
        }[];
        mediaType: string;
        size: number;
        bitRate: number;
        height: number;
      }[];
      transcripts: any[];
      entityUrn: string;
      provider: string;
      aspectRatio: number;
      media: string;
      adaptiveStreams: {
        initialBitRate: number;
        protocol: string;
        mediaType: string;
        masterPlaylists: {
          url: string;
          expiresAt: number;
        }[];
      }[];
      trackingId: string;
    };
  };
  "com.linkedin.voyager.feed.render.ArticleComponent"?: {
    urn: string;
    headlineBackgroundColor: string;
    swapTitleAndSubtitle: boolean;
    saveAction: {
      entityUrn: string;
      saved: boolean;
      dashEntityUrn: string;
    };
    subtitle: {
      textDirection: string;
      text: string;
    };
    navigationContext: {
      trackingActionType: string;
      accessibilityText: string;
      actionTarget: string;
    };
    largeImage?: {
      accessibilityTextAttributes?: any[];
      attributes?: {
        useCropping: boolean;
        sourceType: string;
        vectorImage: VectorImageTypes;
        displayAspectRatio: number;
      }[]
    };
    smallImage?: {
      accessibilityTextAttributes: any[];
      attributes: {
        useCropping: boolean;
        sourceType: string;
        vectorImage: VectorImageTypes;
        displayAspectRatio: number;
      }[];
    }
    showSmallTitle: boolean;
    type: string;
    title: {
      textDirection: string;
      text: string;
    };
  };
  "com.linkedin.voyager.feed.render.CelebrationComponent"?: {
    image: {
      accessibilityTextAttributes: any[];
      attributes: {
        sourceType: string;
        imageUrl: string;
      }[]
    };
    headline: {
      textDirection: string;
      attributes: any[];
      text: string;
    }
  }
  "com.linkedin.voyager.feed.render.DocumentComponent"?: {
    document: {
      transcribedDocumentUrl: string;
      urn: string;
      manifestUrl: string;
      scanRequiredForDownload: boolean;
      totalPageCount: number;
      manifestUrlExpiresAt: number;
      title: string;
      transcribedDocumentUrlExpiresAt: number;
      coverPages: {
        transcripts: any[];
        pagesPerResolution: {
          width: number;
          height: number;
          imageUrls: string[];
        }[]
      }
    };
    showDownloadCTA: boolean;
  }
}

interface ResharedUpdateTypes {
  actor: ActorTypes;
  dashEntityUrn: string;
  updateMetadata: UpdateMetadataTypes;
  socialContent: SocialContentTypes;
  entityUrn: string;
  content?: ContentTypes;
  commentary?: CommentaryTypes;
  socialDetail?: SocialDetailTypes;
}

interface SocialDetailTypes {
  reactionElements?: any[];
  dashEntityUrn: string;
  comments: {
    paging: {
      start: number;
      count: number;
      total: number;
      links: any[];
    };
    elements: any[];
  };
  socialPermissions: {
    dashEntityUrn: string;
    canPostComments: boolean;
    entityUrn: string;
    messagePermission: string;
    canShare: boolean;
    canReact: boolean;
  };
  showPremiumAnalytics: boolean;
  hideFirstPrompt: boolean;
  liked: boolean;
  showShareButton: boolean;
  totalShares: number;
  urn: string;
  threadId: string;
  allowedCommentersScope: string;
  totalSocialActivityCounts: {
    socialDetailEntityUrn: string;
    urn: string;
    numComments: number;
    dashEntityUrn: string;
    reactionTypeCounts: {
      count: number;
      reactionType: string;
    }[];
    entityUrn: string;
    numShares: number;
    numLikes: number;
    liked: boolean;
  };
  entityUrn: string;
  commentingDisabled: boolean;
  likes: {
    paging: {
      start: number;
      count: number;
      total: number;
      links: any[];
    };
    elements: any[];
  }
}

interface CommentaryTypes {
  numLines: number;
  text: {
    textDirection: string;
    text: string;
    attributes?: {
      start: number;
      length: number;
      miniCompany?: ActorMiniCompanyTypes;
      type: string;
    }[];
  };
  translationUrn?: string;
  originalLanguage?: string;
  dashTranslationUrn?: string;
}

interface SocialContentTypes {
  updateSaveActionToolTipLegoTrackingToken: string;
  shareUrl: string;
}

interface UpdateMetadataTypes {
  urn: string;
  actionsPosition: string;
  updateActions: {
    actions: {
      actionType?: string;
      targetUrn?: string;
      contentSource?: string;
      authorProfileId?: string;
      authorUrn?: string;
      icon: {
        accessibilityTextAttributes: any[];
        attributes: {
          sourceType: string;
          systemImage?: string;
        }[];
      };
      secondaryAction?: {
        icon: {
          accessibilityTextAttributes: any[];
          attributes: {
            sourceType: string;
            systemImage: string;
          }[];
        };
        actionType: string;
        targetUrn: string;
        text: string;
        confirmationAction: {
          title: {
            textDirection?: string;
            text: string;
          };
          description: {
            textDirection: string;
            text: string;
          };
          undoable: boolean;
        };
      };
      text?: string;
      followAction?: {
        followTrackingActionType: string;
        unfollowTrackingActionType: string;
        followingInfo: {
          followingType: string;
          entityUrn: string;
          dashFollowingStateUrn: string;
          following: boolean;
          trackingUrn: string;
        }
        type: string;
        trackingActionType: string;
      };
      saveAction?: {
        entityUrn: string;
        saved: boolean;
        dashEntityUrn: string;
      };
      url?: string;
      confirmationAction?: {
        description: {
          textDirection: string;
          text: string;
        };
        undoable: boolean;
        title: {
          textDirection?: string;
          text: string;
        };
        nextBestAction?: {
          title: {
            textDirection?: string;
            text: string;
          }
          confirmationTitle: string;
          contentUnion: {
            removeConnectionAction: {
              icon: {
                accessibilityTextAttributes: any[];
                attributes: {
                  sourceType: string;
                  systemImage: string;
                }[]
              };
              text: string;
              targetUrn: string;
            }
          }
        }
      }
    }[];
    entityUrn: string;
    dashEntityUrn: string;
  };
  actionTriggerEnabled: boolean;
  detailPageType?: string;
  shareAudience: string;
  shouldForceRefetchFromNetwork?: boolean;
  shareUrn: string;
  excludedFromSeen: boolean;
  rootShare: boolean;
  trackingData: {
    requestId: string;
    trackingId: string;
  }
}

interface ActorTypes {
  urn: string;
  image: ImageActorTypes;
  name: NameTypes;
  subDescription: SubDescriptionTypes;
  navigationContext: NavigationContextTypes;
  description: DescriptionTypes;
  followAction?: FollowActionTypes;
  supplementaryActorInfo?: SupplementaryActorInfoTypes;
}

interface NameTypes {
  textDirection: string;
  attributes: {
    start: number;
    length: number;
    miniProfile?: ActorMiniProfileTypes;
    type: string;
  }[];
  text: string;
  accessibilityText: string;
}

interface SubDescriptionTypes {
  textDirection: string;
  attributes: {
    start: number;
    length: number;
    artDecoIcon: string;
    type: string;
  }[]
  text: string;
  accessibilityText: string;
}

interface NavigationContextTypes {
  trackingActionType: string;
  accessibilityText: string;
  actionTarget: string;
}

interface DescriptionTypes {
  textDirection: string;
  accessibilityText: string;
  text: string;
}

interface FollowActionTypes {
  followTrackingActionType: string;
  companyFollowingTrackingContext?: string;
  unfollowTrackingActionType: string;
  followingInfo: {
    followingType: string;
    entityUrn: string;
    followerCount?: number;
    dashFollowingStateUrn: string;
    following: boolean;
    trackingUrn: string;
  }
  type: string;
  trackingActionType: string;
}

interface SupplementaryActorInfoTypes {
  textDirection: string | undefined;
  accessibilityText: string;
  text: string;
}

interface ImageActorTypes {
  accessibilityTextAttributes: any[];
  attributes: {
    sourceType: "PROFILE_PICTURE" | "COMPANY_LOGO" | string;
    miniProfile?: ActorMiniProfileTypes;
    miniCompany?: ActorMiniCompanyTypes;
  }[]
}

interface ActorMiniProfileTypes {
  firstName: string;
  lastName: string;
  dashEntityUrn: string;
  occupation: string;
  objectUrn: string;
  entityUrn: string;
  backgroundImage?: {
    "com.linkedin.common.VectorImage": VectorImageTypes;
  };
  publicIdentifier: string;
  picture: {
    "com.linkedin.common.VectorImage": VectorImageTypes;
  };
  trackingId: string;
}

interface VectorImageTypes {
  artifacts: {
    width: number;
    height: number;
    expiresAt: number;
    fileIdentifyingUrlPathSegment: string;
  }[];
  rootUrl: string;
}

interface ActorMiniCompanyTypes {
  objectUrn: string;
  entityUrn: string;
  name: string;
  showcase: boolean;
  active: boolean;
  logo: {
    "com.linkedin.common.VectorImage": VectorImageTypes;
  }
  universalName: string;
  dashCompanyUrn: string;
  trackingId: string;
}

interface ElementsTypes {
  actor: ActorTypes;
  dashEntityUrn: string;
  updateMetadata: UpdateMetadataTypes
  socialContent: SocialContentTypes;
  entityUrn: string;
  commentary?: CommentaryTypes
  socialDetail: SocialDetailTypes;
  resharedUpdate?: ResharedUpdateTypes;
  content?: ContentTypes;
  header?: HeaderTypes;
  footer?: FooterTypes;
}

interface MetadataTypes {
  paginationToken: string;
  newRelevanceFeed: boolean;
  id: string;
  type: string;
  queryAfterTime: number;
}

interface PagingTypes {
  count: number;
  start: number;
  links: any[];
}

export interface PostData {
  metadata: MetadataTypes;
  elements: ElementsTypes[];
  paging: PagingTypes;
}